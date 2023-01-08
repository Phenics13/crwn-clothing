import { useContext } from 'react';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../compenents/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {['Product', 'Description', 'Quantity', 'Price', 'Remove']
          .map((item, idx) => (
            <HeaderBlock key={idx}>
              <span>{item}</span>
            </HeaderBlock>
          ))}
      </CheckoutHeader>
      {cartItems.length
        ? cartItems.map(item =>
          <CheckoutItem
            key={item.id}
            cartItem={item}
          />
        )
        : <h2>Your cart is empty</h2>
      }
      <Total>{`Total: $${cartTotal}`}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;