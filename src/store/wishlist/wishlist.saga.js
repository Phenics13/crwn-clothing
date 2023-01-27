import { all, call, put, takeLatest, select } from "redux-saga/effects";

import { WISHLIST_ACTION_TYPES } from "./wishlist.types";
import { USER_ACTION_TYPES } from "../user/user.types";

import {
  createWishlistDocumentFromAuth,
  updateWishlistDocumentFromLocalState
} from "../../utils/firebase/firebase.utils";

import {
  emptyWishlist,
  fetchWishlistFailed,
  fetchWishlistSuccess,
  setFirebaseWishlist,
  updateWishlistFailed,
  updateWishlistSuccess
} from "./wishlist.action";

import { selectWishlist } from "./wishlist.selector";
import { selectCurrentUser } from "../user/user.selector";

export function* fetchWishlistAsync({ payload }) {
  const user = payload ? payload : yield select(selectCurrentUser);
  const wishlist = yield select(selectWishlist);

  try {
    const firebaseWishlistSnapshot = yield call(
      createWishlistDocumentFromAuth,
      user,
      wishlist
    );
    const firebaseWishlist = firebaseWishlistSnapshot.data().wishlist;

    yield put(setFirebaseWishlist(wishlist, firebaseWishlist));
    yield put(fetchWishlistSuccess());
  } catch (error) {
    yield put(fetchWishlistFailed(error));
  }
}

export function* updateFirebaseWishlist({ payload }) {
  const user = yield select(selectCurrentUser);
  if (!user) return;
  const wishlist = payload;

  try {
    yield call(updateWishlistDocumentFromLocalState, user, wishlist);
    yield put(updateWishlistSuccess());
  } catch (error) {
    yield put(updateWishlistFailed(error));
  }
};

export function* emptyLocalWishlist() {
  yield put(emptyWishlist());
}

export function* onSignInSuccessSyncWishlist() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, fetchWishlistAsync);
}

export function* onSetWishlist() {
  yield takeLatest(WISHLIST_ACTION_TYPES.SET_WISHLIST, updateFirebaseWishlist);
}

export function* onFetchWishlist() {
  yield takeLatest(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START, fetchWishlistAsync);
}

export function* onSignOutSuccessEmptyWishlist() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, emptyLocalWishlist);
}

export function* wishlistSagas() {
  yield all([
    call(onSignInSuccessSyncWishlist),
    call(onSetWishlist),
    call(onFetchWishlist),
    call(onSignOutSuccessEmptyWishlist),
  ]);
}