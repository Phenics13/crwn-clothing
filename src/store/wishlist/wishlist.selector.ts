import { createSelector } from "reselect";
import { WishlistState } from "./wishlist.reducer";

import { RootState } from "../store";

const selectWishlistReducer = (state: RootState): WishlistState => state.wishlist;

export const selectWishlist = createSelector(
  [selectWishlistReducer],
  (wishlistSlice) => wishlistSlice.wishlist
);

export const selectWishlistSorted = createSelector(
  [selectWishlist],
  (wishlist) =>
    [...wishlist].sort((product1, product2) =>
      product1.createdAt > product2.createdAt ? -1 : 1
    )
);

export const selectWishlistCount = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.length
);

export const selectWishlistIsLoading = createSelector(
  [selectWishlistReducer],
  (wishlistSlice) => wishlistSlice.isLoading
);
