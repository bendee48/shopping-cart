import { useOutletContext } from "react-router-dom";
import BasketCard from "./BasketCard";
import styles from "./Basket.module.css"

function Basket() {
  const { basket } = useOutletContext()
  const basketTotal = calcTotal()

  function calcTotal() {
    console.log(basket)
    return basket.reduce((sum, prod) => {
      return sum += prod.quantity * prod.price;
    }, 0)
  }

  return (
    <div className={styles.basket}>
      { basket.map(product => <BasketCard key={product.id} product={product} />) }
      <div className={styles.basket_total}>Total: £{basketTotal}</div>
    </div>
  )
}

export default Basket;