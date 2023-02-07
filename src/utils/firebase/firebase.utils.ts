import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import { Category } from "../../store/categories/category.types";
import { CurrentUser } from "../../store/user/user.types";
import { WishlistItem } from "../../store/wishlist/wishlist.types";
import { WishlistState } from "../../store/wishlist/wishlist.reducer";

const firebaseConfig = {
  apiKey: "AIzaSyAOFL7Jm3kz571UfFhQ6HcPDsQHxdInomY",
  authDomain: "crwn-clothing-db-3dff0.firebaseapp.com",
  projectId: "crwn-clothing-db-3dff0",
  storageBucket: "crwn-clothing-db-3dff0.appspot.com",
  messagingSenderId: "575024768730",
  appId: "1:575024768730:web:030573674c491f5bcc27e3",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(app);

export type ObjectsToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export const updateWishlistDocumentFromLocalState = async (
  user: CurrentUser,
  wishlist: WishlistItem[]
): Promise<void | QueryDocumentSnapshot<WishlistState>> => {
  if (!user) return;

  const wishlistDocRef = doc(db, "wishlists", user.id);
  await getDoc(wishlistDocRef);

  try {
    await setDoc(wishlistDocRef, {
      wishlist,
    });
  } catch (error) {
    console.log("error updating the user wishlist", error);
  }

  return (await getDoc(wishlistDocRef)) as QueryDocumentSnapshot<WishlistState>; // instead of wishlistSnapshot to prevent data clash
};

export const createWishlistDocumentFromAuth = async (
  user: CurrentUser,
  wishlist: WishlistItem[]
): Promise<void | QueryDocumentSnapshot<WishlistState>> => {
  if (!user) return;

  const wishlistDocRef = doc(db, "wishlists", user.id);
  const wishlistSnapshot = await getDoc(wishlistDocRef);

  if (!wishlistSnapshot.exists()) {
    try {
      await setDoc(wishlistDocRef, {
        wishlist,
      });
    } catch (error) {
      console.log("error creating the user wishlist", error);
    }
  }

  return (await getDoc(wishlistDocRef)) as QueryDocumentSnapshot<WishlistState>; // instead of wishlistSnapshot to prevent data clash
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return (await getDoc(userDocRef)) as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
