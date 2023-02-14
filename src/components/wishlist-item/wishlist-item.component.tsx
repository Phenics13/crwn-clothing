import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectWishlist } from "../../store/wishlist/wishlist.selector";
import { removeItemFromWishlist } from "../../store/wishlist/wishlist.action";

import {
  WishlistItemContainer,
  BaseSpan,
  NameSpan,
  PlusButton,
  RemoveButton,
} from "./wishlist-item.styled";

import { WishlistItem as TWishlistItem } from "../../store/wishlist/wishlist.types";

type WishlistItemProps = {
  wishlistItem: TWishlistItem;
};

const WishlistItem: FC<WishlistItemProps> = ({ wishlistItem }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price } = wishlistItem;
  const { createdAt, ...product } = wishlistItem;
  const wishlist = useSelector(selectWishlist);
  const cartItems = useSelector(selectCartItems);

  const addToCartHandler = () => dispatch(addItemToCart(cartItems, product));

  const removeFromWishlistHandler = () =>
    dispatch(removeItemFromWishlist(wishlist, wishlistItem));

  return (
    <WishlistItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <NameSpan>{name}</NameSpan>
      <BaseSpan>{price}</BaseSpan>
      <PlusButton onClick={addToCartHandler}>&#43;</PlusButton>
      <RemoveButton onClick={removeFromWishlistHandler}>&#10005;</RemoveButton>
    </WishlistItemContainer>
  );
};

export default WishlistItem;
