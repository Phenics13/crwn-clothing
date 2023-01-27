import { WISHLIST_ACTION_TYPES } from "./wishlist.types";

const WISHLIST_INITIAL_STATE = {
  wishlist: [],
  isLoading: false,
  error: null,
}

export const wishlistReducer = (state = WISHLIST_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case WISHLIST_ACTION_TYPES.SET_WISHLIST:
      return { ...state, wishlist: payload };
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START:
      return { ...state, isLoading: true};
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS:
      return {...state, isLoading: false};
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_FAILED:
    case WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAILED:
      return {...state, error: payload};
    default:
      return state
  }
};