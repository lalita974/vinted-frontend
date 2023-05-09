//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51N5qZbEdLR40IjMKdUiRKCKdcsifV2jsmyTFcnyUrTd1egeBpsp6XF6ZglP12WCpmsfuo5WTTMEZ3hYZHiq82abU002tH9RN91"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
