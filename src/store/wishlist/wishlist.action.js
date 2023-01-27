import { createAction } from "../../utils/reducer/reducer.utils"
import { WISHLIST_ACTION_TYPES } from "./wishlist.types"

const addWishlistItem = (wishlist, productToAdd) => {
  const existingWishlistItem = wishlist.find(
    wishlistItem => wishlistItem.id === productToAdd.id
  );

  if (existingWishlistItem) return wishlist;

  return [...wishlist, { ...productToAdd, createdAt: new Date().toISOString() }];
};

const removeWishlistItem = (wishlist, wishlistItemToRemove) => {
  return wishlist.filter(wishlistItem =>
    wishlistItem.id !== wishlistItemToRemove.id);
}

const addWishlistItemsFromFirebase = (wishlist, productsToAdd) => {
  return [...wishlist, ...productsToAdd.filter(productToAdd => {
    const existingProduct = wishlist.find(
      wishlistItem => wishlistItem.id === productToAdd.id
    )
    return !existingProduct;
  })]
};

export const setWishlist = (wishlist) =>
  createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST, wishlist);

export const fetchWishlistStart = () =>
  createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START); 

export const fetchWishlistSuccess = () =>
  createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS);

export const fetchWishlistFailed = (error) =>
  createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_FAILED, error);

export const updateWishlistSuccess = () =>
  createAction(WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS);

export const updateWishlistFailed = (error) =>
  createAction(WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAILED, error);

export const addItemToWishlist = (wishlist, productToAdd) =>
  setWishlist(addWishlistItem(wishlist, productToAdd));

export const removeItemFromWishlist = (wishlist, wishlistItemToRemove) =>
  setWishlist(removeWishlistItem(wishlist, wishlistItemToRemove));

export const emptyWishlist = () => setWishlist([]);

export const setFirebaseWishlist = (wishlist, firebaseWishlist) =>
  setWishlist(addWishlistItemsFromFirebase(wishlist, firebaseWishlist));
