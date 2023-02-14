import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../store/wishlist/wishlist.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectWishlist } from "../../store/wishlist/wishlist.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCardContainer,
  Footer,
  ButtonContainer,
} from "./product-card.styles";

import { CategoryItem } from "../../store/categories/category.types";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlist = useSelector(selectWishlist);

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  const isExistInWishlist = (product: CategoryItem) => {
    return wishlist.find((wishlistItem) => wishlistItem.id === product.id);
  };

  const addProductToWishlist = () => {
    const wishlistItem = isExistInWishlist(product);
    if (wishlistItem) {
      dispatch(removeItemFromWishlist(wishlist, wishlistItem));
    } else {
      dispatch(addItemToWishlist(wishlist, product));
    }
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <ButtonContainer>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          {" "}
          Add to card
        </Button>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToWishlist}
        >
          {isExistInWishlist(product) ? "❤️" : "🤍"}
        </Button>
      </ButtonContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
