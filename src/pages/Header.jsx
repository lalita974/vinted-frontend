import { Link } from "react-router-dom";
import logo from "../assets/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
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

        <div>
          <button className="bouton-blanc">S`inscrire</button>
          <button className="bouton-blanc">Se connecter</button>
        </div>
        <button className="bouton-bleu">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
