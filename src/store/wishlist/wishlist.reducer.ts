import { AnyAction } from "redux";
import {
  fetchWishlistFailed,
  fetchWishlistStart,
  fetchWishlistSuccess,
  setWishlist,
  updateWishlistFailed,
} from "./wishlist.action";
import { WishlistItem, WISHLIST_ACTION_TYPES } from "./wishlist.types";

export type WishlistState = {
  readonly wishlist: WishlistItem[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const WISHLIST_INITIAL_STATE: WishlistState = {
  wishlist: [],
  isLoading: false,
  error: null,
};

export const wishlistReducer = (
  state = WISHLIST_INITIAL_STATE,
  action: AnyAction
): WishlistState => {
  if (setWishlist.match(action)) {
    return { ...state, wishlist: action.payload };
  }
  if (fetchWishlistStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchWishlistSuccess.match(action)) {
    return { ...state, isLoading: false };
  }
  if (fetchWishlistFailed.match(action) || updateWishlistFailed.match(action)) {
    return { ...state, error: action.payload };
  }
  return state;
};
