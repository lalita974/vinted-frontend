import { Link } from "react-router-dom";
import logo from "../assets/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const { token, handleToken } = props;
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="vinted" />
        </Link>
        <div className="search">
          <p>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              style={{ color: "#939393" }}
            />
          </p>
          <input type="text" placeholder="Rechercher des articles" />
        </div>

        {token ? (
          <div>
            <button
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button className="bouton-blanc">S&#39;inscrire</button>
            </Link>
            <Link to="/login">
              <button className="bouton-blanc">Se connecter</button>
            </Link>
          </div>
        )}

        <button className="bouton-bleu">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
