import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";

//Components
import Header from "./components/Header";
import Modal from "./components/Modal";

//Icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(faMagnifyingGlass);

const App = () => {
  const [token, setToken] = useState(Cookies.get("tokenVinted") || null);
  const [visible, setVisible] = useState(false);
  const [descending, setDescending] = useState(false);
  const [search, setSearch] = useState("");
  const [priceMinMax, setPriceMinMax] = useState([0, 250]);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("tokenVinted", token, {});
      setVisible(false);
    } else {
      setToken(null);
      Cookies.remove("tokenVinted");
    }
  };

  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Le bloc ci dessous va apparaitre sur toutes mes pages */}
      <Header
        token={token}
        handleToken={handleToken}
        visible={visible}
        setVisible={setVisible}
        descending={descending}
        setDescending={setDescending}
        setSearch={setSearch}
        setPriceMinMax={setPriceMinMax}
      />
      {/* Le composant Routes doit contenir toutes mes Route il affiche un composant à la fois */}
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route
          path="/"
          element={
            <Home
              descending={descending}
              search={search}
              priceMinMax={priceMinMax}
            />
          }
        />
        {/* Cette route attend un params dans son URL */}
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <Signup
              handleToken={handleToken}
              visible={visible}
              setVisible={setVisible}
            />
          }
        />
        <Route path="/publish" element={<Publish />} />
      </Routes>
      {visible && (
        <Modal
          handleToken={handleToken}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </Router>
  );
};

export default App;
