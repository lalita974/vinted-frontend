import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Product Component</h2>
      <span>The Offer id is : {id}</span>
    </div>
  );
};

export default Offer;
