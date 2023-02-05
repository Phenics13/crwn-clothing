export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
};

export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}