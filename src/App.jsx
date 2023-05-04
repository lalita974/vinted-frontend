import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./pages/Header";

//Icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

const App = () => {
  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Le bloc ci dessous va apparaitre sur toutes mes pages */}
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/offer:id">Offers</Link>
          </li>
        </ul>
      </nav>
      {/* Le composant Routes doit contenir toutes mes Route il affiche un composant à la fois */}
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home />} />
        {/* Cette route attend un params dans son URL */}
        <Route path="/offer:id" element={<Offer />} />
      </Routes>
    </Router>
  );
};

export default App;
