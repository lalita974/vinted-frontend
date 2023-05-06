import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//Components
import Header from "./components/Header";

//Icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(faMagnifyingGlass);

const App = () => {
  const [token, setToken] = useState(Cookies.get("tokenVinted") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("tokenVinted", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("tokenVinted");
    }
  };

  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Le bloc ci dessous va apparaitre sur toutes mes pages */}
      <Header token={token} handleToken={handleToken} />
      {/* Le composant Routes doit contenir toutes mes Route il affiche un composant à la fois */}
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home />} />
        {/* Cette route attend un params dans son URL */}
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
