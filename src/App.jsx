import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

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
  const [userId, setUserId] = useState(Cookies.get("tokenId") || null);

  const environnement = "https://lereacteur-vinted-api.herokuapp.com";

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("tokenVinted", token, { expires: 7, sameSite: "Strict" });
      setVisible(false);
    } else {
      setToken(null);
      Cookies.remove("tokenVinted");
    }
  };

  const handleUserId = (userId) => {
    if (userId) {
      setUserId(userId);
      Cookies.set("tokenId", userId, { expires: 7, sameSite: "Strict" });
      setUserId(false);
    } else {
      setUserId(null);
      Cookies.remove("tokenId");
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
        handleUserId={handleUserId}
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
              environnement={environnement}
            />
          }
        />
        {/* Cette route attend un params dans son URL */}
        <Route
          path="/offer/:id"
          element={
            <Offer
              environnement={environnement}
              visible={visible}
              token={token}
              setVisible={setVisible}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              handleToken={handleToken}
              visible={visible}
              setVisible={setVisible}
              environnement={environnement}
              handleUserId={handleUserId}
            />
          }
        />
        <Route
          path="/publish"
          element={<Publish token={token} environnement={environnement} />}
        />

        <Route
          path="/payment"
          element={
            <Payment
              token={token}
              environnement={environnement}
              userId={userId}
            />
          }
        />
      </Routes>
      {visible && (
        <Modal
          handleToken={handleToken}
          visible={visible}
          setVisible={setVisible}
          environnement={environnement}
          handleUserId={handleUserId}
        />
      )}
    </Router>
  );
};

export default App;
