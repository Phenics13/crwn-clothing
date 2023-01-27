import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { addItemToWishlist } from '../../store/wishlist/wishlist.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectWishlist } from '../../store/wishlist/wishlist.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import { ProductCardContainer, Footer, ButtonContainer } from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlist = useSelector(selectWishlist);

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  const addProductToWishlist = () => {
    dispatch(addItemToWishlist(wishlist, product));
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </Footer>
      <ButtonContainer>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        > Add to card
        </Button>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToWishlist}
        >&#10084;
        </Button>
      </ButtonContainer>
    </ProductCardContainer>
  );
}

export default ProductCard