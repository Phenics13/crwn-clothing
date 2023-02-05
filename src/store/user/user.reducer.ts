import { AnyAction } from "redux";

import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed
} from "./user.action";
import { User } from "./user.types";

type UserState = {
  currentUser: User | null;
  isLoading: boolean;
  error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const userReducer = (
  state = USER_INITIAL_STATE,
  action = {} as AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
}