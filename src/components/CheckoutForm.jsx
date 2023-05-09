import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
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
          <CardElement className="padding" />
          {!completed && <button type="submit">Pay</button>}
          {completed && (
            <div className="padding">Le paiement a bien été effectué</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
