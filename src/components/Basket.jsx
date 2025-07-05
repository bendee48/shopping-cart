import { useOutletContext, Link } from "react-router-dom";
import BasketCard from "./BasketCard";
import styles from "./Basket.module.css"

function Basket() {
  const { basket } = useOutletContext()
  const basketTotal = calcTotal()

  function calcTotal() {
    return basket.reduce((sum, prod) => {
      return sum += prod.quantity * prod.price;
    }, 0)
  }

  if (basket.length == 0) {
    return (
      <>
        <h1>Your basket is currently empty</h1>
        <p>Go to <Link to={'/shop'}>Shop</Link></p>
      </>

    )
  }

  return (
    <div className={styles.basket}>
      { basket.map(product => <BasketCard key={product.id} product={product} />) }
      <div className={styles.basket_total}>Total: £{basketTotal}</div>
    </div>
  )
}

export default Basket;