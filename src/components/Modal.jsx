import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Modal = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { handleToken, setVisible, visible, environnement, handleUserId } =
    props;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${environnement}/user/login`, {
        email: email,
        password: password,
      });
      //   console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        handleUserId(response.data._id);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* button pour fermer la modal */}
        <button
          onClick={() => {
            setVisible(false);
          }}
        ></button>
        <h1>Se connecter</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              value={email}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage("");
              }}
              value={password}
            />
          </div>
          <div className="modal-buttons">
            <button className="modal-form-button" type="submit">
              Se connecter
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Link to="/signup">
              <button
                className="modal-form-redirection"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                Pas encore de compte ? Inscris-toi !
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
