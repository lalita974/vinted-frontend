import { useState } from "react";
import axios from "axios";

const Publish = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("file", file);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section>
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="file"
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
          <div className="bloc">
            <label className="interieur-bloc">
              Titre
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </label>
            <label className="interieur-bloc">
              Décris ton article
              <input
                type="text"
                placeholder="ex: Porté quelques fois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="bloc">
            <label className="interieur-bloc">
              Marque
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </label>
            <label className="interieur-bloc">
              Taille
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </label>
            <label className="interieur-bloc">
              Couleur
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </label>
            <label className="interieur-bloc">
              Etat
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </label>
            <label className="interieur-bloc">
              Lieu
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="bloc">
            <label className="interieur-bloc">
              Prix
              <input
                type="text"
                placeholder="ex: 0.00€"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="publish-button">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Publish;
