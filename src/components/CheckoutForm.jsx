import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState(0); //0 paiement pas fait, 1 en attente de réponse, 2 paiement réussi; 3 échec de paiement

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentStatus(1);
    try {
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: props.userId,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(`${props.environnement}/payment`, {
        token: stripeToken,
        title: props.title,
        amount: props.price,
      });
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setPaymentStatus(2);
      }
    } catch (error) {
      console.log(error.response.data);
      setPaymentStatus(3);
    }
  };

  const total = props.price + 3;

  return (
    <div className="payment-background">
      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <h3>Résumé de la commande</h3>
          <ul>
            <li>
              Commande <p>{props.price} €</p>
            </li>
            <li>
              Frais protection acheteurs <p>1.00 €</p>
            </li>
            <li>
              Frais de port <p>2.00 €</p>
            </li>
          </ul>
          <h4>
            Total de la commande <p>{total} €</p>
          </h4>
          <br />
          <div className="padding">
            Il ne vous reste plus qu&#39;une étape pour vous offrir{" "}
            <span className="bold">{props.title}</span>
            😍. Vous allez payer <span className="bold">{total} €</span> (frais
            de protection et frais de port inclus).
          </div>
          {paymentStatus === 2 ? (
            <div className="padding">Le paiement a bien été effectué.</div>
          ) : (
            <div>
              <CardElement className="padding" />
              <button type="submit" disabled={paymentStatus === 1}>
                Pay
              </button>
            </div>
          )}
          {paymentStatus === 3 && (
            <p className="padding">
              Une erreur est survenue, veuillez réessayer.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
