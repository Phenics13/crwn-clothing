import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../compenents/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';
import PaymentForm from '../../compenents/payment-form/payment-form.component';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
      <PaymentForm />
    </CheckoutContainer>
  );
}

export default Checkout;