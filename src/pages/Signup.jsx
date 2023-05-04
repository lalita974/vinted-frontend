import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>S&#39;inscrire</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom d&#39;utilisateur"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                setNewsletter(!newsletter);
              }}
            />
            S&#39;inscrire à notre newsletter
          </label>
          <p>
            En m&#39;inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S&#39;inscrire</button>
        <a href="#">Tu as déjà un compte ? Connecte-toi !</a>
      </form>
    </div>
  );
};

export default Signup;
