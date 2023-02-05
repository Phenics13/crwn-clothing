import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils"
import { CategoryItem } from "../categories/category.types";
import { WishlistItem, WISHLIST_ACTION_TYPES } from "./wishlist.types"

const addWishlistItem = (
  wishlist: WishlistItem[], 
  productToAdd: CategoryItem
): WishlistItem[] => {
  const existingWishlistItem = wishlist.find(
    wishlistItem => wishlistItem.id === productToAdd.id
  );

  if (existingWishlistItem) return wishlist;

  return [
    ...wishlist, 
    { ...productToAdd, createdAt: new Date().toISOString() }
  ];
};

const removeWishlistItem = (
  wishlist: WishlistItem[], 
  wishlistItemToRemove: WishlistItem
): WishlistItem[] => {
  return wishlist.filter(wishlistItem =>
    wishlistItem.id !== wishlistItemToRemove.id);
}

const addWishlistItemsFromFirebase = (
  wishlist: WishlistItem[], 
  firebaseWishlistToAdd: WishlistItem[]
): WishlistItem[] => {
  return [...wishlist, ...firebaseWishlistToAdd.filter(firebaseWishlistItemToAdd => {
    const existingProduct = wishlist.find(
      wishlistItem => wishlistItem.id === firebaseWishlistItemToAdd.id
    )
    return !existingProduct;
  })]
};

type SetWishlist = ActionWithPayload<
  WISHLIST_ACTION_TYPES.SET_WISHLIST, 
  WishlistItem[]
>

type FetchWishlistStart = Action<
  WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START
>

type FetchWishlistSuccess = Action<
  WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS
>

type FetchWishlistFailed = ActionWithPayload<
  WISHLIST_ACTION_TYPES.FETCH_WISHLIST_FAILED, 
  Error
>

type UpdateWishlistSuccess = Action<
  WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS
>

type UpdateWishlistFailed = ActionWithPayload<
  WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAILED, 
  Error
>

export const setWishlist = withMatcher(
  (wishlist: WishlistItem[]): SetWishlist =>
    createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST, wishlist)
);

export const fetchWishlistStart = withMatcher(
  (): FetchWishlistStart =>
    createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START)
);

export const fetchWishlistSuccess = withMatcher(
  (): FetchWishlistSuccess =>
    createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS)
);

export const fetchWishlistFailed = withMatcher(
  (error: Error): FetchWishlistFailed =>
    createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_FAILED, error)
);

export const updateWishlistSuccess = (): UpdateWishlistSuccess =>
  createAction(WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS);

export const updateWishlistFailed = withMatcher(
  (error: Error): UpdateWishlistFailed =>
    createAction(WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAILED, error)
);

export const addItemToWishlist = (
  wishlist: WishlistItem[], 
  productToAdd: CategoryItem
): SetWishlist =>
  setWishlist(addWishlistItem(wishlist, productToAdd));

export const removeItemFromWishlist = (
  wishlist: WishlistItem[], 
  wishlistItemToRemove: WishlistItem
): SetWishlist =>
  setWishlist(removeWishlistItem(wishlist, wishlistItemToRemove));

export const emptyWishlist = (): SetWishlist => setWishlist([]);

export const setFirebaseWishlist = (
  wishlist: WishlistItem[], 
  firebaseWishlist: WishlistItem[]
): SetWishlist =>
  setWishlist(addWishlistItemsFromFirebase(wishlist, firebaseWishlist));
