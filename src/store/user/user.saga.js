import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopUp);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail);
}

export function* signUpWithEmail({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { userAuth, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, userAuth, additionalDetails);
}

export function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onEmailSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onEmailSignUpSuccess),
    call(onSignOutStart),
  ]);
}
