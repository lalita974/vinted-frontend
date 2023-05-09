import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${props.environnement}/offer/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, props.environnement]);

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="page-offer">
      <div className="page-offer-container">
        {data.product_pictures && (
          <img
            className="offer-picture"
            src={data.product_pictures[0].secure_url}
            alt="article"
          />
        )}
        <div className="page-offer-description">
          <div className="page-offer-description-bloc-1">
            <div className="page-offer-price">{data.product_price} €</div>
            <div>
              {data.product_details.map((elem, index) => {
                let detail = Object.keys(elem);
                return (
                  <div className="page-offer-detail" key={index}>
                    <p>{detail[0]}</p>
                    <p>{elem[detail[0]]}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="page-offer-description-bloc-2">
            <h4>{data.product_name}</h4>
            <h5>{data.product_description}</h5>
            <div className="page-offer-owner">
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="pic" />
              )}
              <p>{data.owner.account.username}</p>
            </div>
            <button className="page-offer-button">Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
