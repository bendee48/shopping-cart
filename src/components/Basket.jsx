import { useOutletContext } from "react-router-dom";
import BasketCard from "./BasketCard";

function Basket() {
  const { basket } = useOutletContext()
  console.log(basket)
  return (
    <div>
      { basket.map(product => <BasketCard key={product.id} product={product} />) }
    </div>
  )
}

export default Basket;