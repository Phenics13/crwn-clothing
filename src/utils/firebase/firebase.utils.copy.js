import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAOFL7Jm3kz571UfFhQ6HcPDsQHxdInomY",
  authDomain: "crwn-clothing-db-3dff0.firebaseapp.com",
  projectId: "crwn-clothing-db-3dff0",
  storageBucket: "crwn-clothing-db-3dff0.appspot.com",
  messagingSenderId: "575024768730",
  appId: "1:575024768730:web:030573674c491f5bcc27e3"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGooglePopUpChatGPT = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      console.error(error);
    })
};

