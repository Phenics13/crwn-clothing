import { useState, FormEvent } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { StripeAddressElement, StripeCardElement } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { emptyCart } from "../../store/cart/cart.action";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

type addressObject = {
  complete: boolean;
  value: {
    name: string;
    address: object;
  };
};

const ifValidAddressElement = (
  address: StripeAddressElement | null
): address is StripeAddressElement & {
  getValue: () => Promise<addressObject>;
} => address !== null;

const PaymentForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (amount === 0) {
      alert("Your cart is empty");
      return;
    }

    const addressDetails = elements.getElement(AddressElement);

    if (!ifValidAddressElement(addressDetails)) return;

    const {
      complete,
      value: { address, name },
    } = await addressDetails.getValue();

    if (!complete) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name,
          address,
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");

        cardDetails.clear();
        addressDetails.clear();
        dispatch(emptyCart());
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <AddressElement
          options={{
            mode: "shipping",
          }}
        />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
