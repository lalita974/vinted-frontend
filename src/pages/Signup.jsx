import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { handleToken, visible, setVisible, environnement, handleUserId } =
    props;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${environnement}/user/signup`, {
        email: email,
        username: username,
        password: password,
        newsletter: newsletter,
      });
      console.log(response.data);
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
    <div>
      <h1>S&#39;inscrire</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d&#39;utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
            setErrorMessage("");
          }}
          value={username}
        />
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
        <div className="signup-checkbox">
          <label>
            <input
              type="checkbox"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
              checked={newsletter}
            />
            S&#39;inscrire à notre newsletter
          </label>
          <p>
            En m&#39;inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button className="signup-form-button" type="submit">
          S&#39;inscrire
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          className="signup-form-redirection"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </button>
      </form>
    </div>
  );
};

export default Signup;
