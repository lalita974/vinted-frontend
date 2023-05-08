import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePicture from "../assets/home-image.jpg";

const Home = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { descending, search, priceMinMax } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (descending) {
          let response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-desc&title=${search}&priceMin=${priceMinMax[0]}&priceMax=${priceMinMax[1]}`
          );
          setData(response.data);
          setIsLoading(false);
        } else {
          let response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-asc&title=${search}&priceMin=${priceMinMax[0]}&priceMax=${priceMinMax[1]}`
          );
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [descending, search, priceMinMax]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="bloc-endessous">
        <img src={homePicture} alt="girls shopping" />
        <div className="bloc-superpose">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className="bouton-bleu-home">Commencer à vendre</button>
        </div>
      </div>

      <div className="affichage-home">
        {data.offers.map((article) => {
          const marque = article.product_details.find((elem) => elem.MARQUE);
          const taille = article.product_details.find((elem) => elem.TAILLE);
          return (
            <Link to={`/offer/${article._id}`} key={article._id}>
              <article>
                <div className="user-info">
                  <div>
                    {article.owner.account.avatar && (
                      <img
                        className="account-picture"
                        src={article.owner.account.avatar.secure_url}
                        alt=""
                      />
                    )}
                  </div>
                  <div>{article.owner.account.username}</div>
                </div>
                <img
                  className="offer-picture"
                  src={article.product_pictures[0].secure_url}
                  alt="article"
                />
                <div className="price">{article.product_price} €</div>
                <div className="taille-marque">{taille && taille.TAILLE}</div>
                <div className="taille-marque">{marque.MARQUE}</div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
