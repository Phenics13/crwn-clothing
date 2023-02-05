export enum WISHLIST_ACTION_TYPES {
  SET_WISHLIST = 'wishlist/SET_WISHLIST',
  FETCH_WISHLIST_START = 'wishlist/FETCH_WISHLIST_START',
  FETCH_WISHLIST_SUCCESS = 'wishlist/FETCH_WISHLIST_SUCCESS',
  FETCH_WISHLIST_FAILED = 'wishlist/FETCH_WISHLIST_FAILED',
  UPDATE_WISHLIST_SUCCESS = 'wishlist/UPDATE_WISHLIST_SUCCESS',
  UPDATE_WISHLIST_FAILED = 'wishlist/UPDATE_WISHLIST_FAILED',
}

export type WishlistItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  createdAt: string;
}