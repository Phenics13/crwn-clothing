import { all, call, put, takeLatest, select } from "typed-redux-saga/macro";

import { WISHLIST_ACTION_TYPES } from "./wishlist.types";
import { USER_ACTION_TYPES } from "../user/user.types";

import {
  createWishlistDocumentFromAuth,
  updateWishlistDocumentFromLocalState,
} from "../../utils/firebase/firebase.utils";

import {
  emptyWishlist,
  fetchWishlistFailed,
  fetchWishlistSuccess,
  setFirebaseWishlist,
  SetWishlist,
  updateWishlistFailed,
  updateWishlistSuccess,
} from "./wishlist.action";

import { selectWishlist } from "./wishlist.selector";
import { selectCurrentUser } from "../user/user.selector";

import { SignInSuccess } from "../user/user.action";

export function* fetchWishlistAsync({ payload: user }: SignInSuccess) {
  const currentUser = user ? user : yield* select(selectCurrentUser);
  if (!currentUser) return;
  const wishlist = yield* select(selectWishlist);

  try {
    const firebaseWishlistSnapshot = yield* call(
      createWishlistDocumentFromAuth,
      currentUser,
      wishlist
    );

    if (firebaseWishlistSnapshot) {
      const firebaseWishlist = firebaseWishlistSnapshot.data().wishlist;
      yield* put(setFirebaseWishlist(wishlist, firebaseWishlist));
    }

    yield* put(fetchWishlistSuccess());
  } catch (error) {
    yield* put(fetchWishlistFailed(error as Error));
  }
}

export function* updateFirebaseWishlist({ payload: wishlist }: SetWishlist) {
  const user = yield* select(selectCurrentUser);
  if (!user) return;

  try {
    yield* call(updateWishlistDocumentFromLocalState, user, wishlist);
    yield* put(updateWishlistSuccess());
  } catch (error) {
    yield* put(updateWishlistFailed(error as Error));
  }
}

export function* emptyLocalWishlist() {
  yield* put(emptyWishlist());
}

export function* onSignInSuccessSyncWishlist() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, fetchWishlistAsync);
}

export function* onSetWishlist() {
  yield* takeLatest(WISHLIST_ACTION_TYPES.SET_WISHLIST, updateFirebaseWishlist);
}

export function* onFetchWishlist() {
  yield* takeLatest(
    WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START,
    fetchWishlistAsync
  );
}

export function* onSignOutSuccessEmptyWishlist() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, emptyLocalWishlist);
}

export function* wishlistSagas() {
  yield* all([
    call(onSignInSuccessSyncWishlist),
    call(onSetWishlist),
    call(onFetchWishlist),
    call(onSignOutSuccessEmptyWishlist),
  ]);
}
