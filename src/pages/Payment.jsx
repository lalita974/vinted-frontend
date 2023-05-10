import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  const location = useLocation();
  const { title, price } = location.state;

  return props.token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        environnement={props.environnement}
        userId={props.userId}
        title={title}
        price={price}
      />
    </Elements>
  ) : (
    <Navigate to="/" />
  );
};

export default Payment;
