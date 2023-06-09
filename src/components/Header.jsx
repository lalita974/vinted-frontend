import { Link } from "react-router-dom";
import logo from "../assets/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactSlider from "react-slider";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const {
    token,
    handleToken,
    visible,
    setVisible,
    descending,
    setDescending,
    setSearch,
    setPriceMinMax,
    handleUserId,
  } = props;
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="vinted" />
        </Link>
        <div className="search-zone">
          <div className="search">
            <p>
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                style={{ color: "#939393" }}
              />
            </p>
            <input
              type="text"
              placeholder="Rechercher des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          <div className="toogle-and-slider">
            <label className="toggle">
              Trier par prix :
              <input
                className="toggle__input"
                type="checkbox"
                id="descending-button"
                onClick={() => {
                  setDescending(!descending);
                }}
              />
              <div className="toggle__fill"></div>
            </label>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 250]}
              max={500}
              min={0}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              pearling
              minDistance={5}
              onAfterChange={(value, index) => setPriceMinMax(value)}
            />
          </div>
        </div>

        {token ? (
          <div>
            <button
              className="bouton-rouge"
              onClick={() => {
                handleToken(null);
                handleUserId(null);
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
            <button
              className="bouton-blanc"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button
          className="bouton-bleu"
          onClick={() => {
            if (token) {
              navigate("/publish");
            } else {
              setVisible(!visible);
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
