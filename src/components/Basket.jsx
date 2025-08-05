import { useOutletContext, Link } from "react-router-dom";
import BasketCard from "./BasketCard";
import styles from "./Basket.module.css"

/**
 * Component that displays the contents of the user's basket.
 * - If the basket is empty, it shows a message and a link to the shop.
 * - If there are items, it renders a list of `BasketCard` components and the total price.
 *
 * @component
 * @returns {JSX.Element} The rendered basket view.
 */
function Basket() {
  /**
   * Gets the `basket` array from the outlet context.
   * Each item is expected to have at least:
   * - `id`: number
   * - `title`: string
   * - `price`: number
   * - `quantity`: number
   * Gets the `setBasket` function
   */
  const { basket, setBasket } = useOutletContext()
  let basketTotal = null;

  /**
   * Calculates the total cost of items in the basket.
   *
   * @private
   * @returns {number} The total price of all items.
   */
  function calcTotal() {
    return basket.reduce((sum, prod) => {
      return sum += prod.quantity * prod.price;
    }, 0)
  }

  if (basket.length == 0) {
    return (
      <>
        <h1 className={styles.empty_basket_header}>Your basket is currently empty</h1>
        <p className={styles.shop_link_text}>Go to <Link to={'/shop'} className={styles.shop_link}>Shop</Link></p>
      </>

    )
  } else {
    basketTotal = calcTotal();
  }

  return (
    <div className={styles.basket_container}>
      { basket.map(product => <BasketCard key={product.id} product={product} />) }
      <hr />
      <div data-testid='basket-total' className={styles.basket_total}>Total: £{basketTotal.toFixed(2)}</div>
      <button className={styles.checkout_btn} onClick={()=> {
        alert(
          'Your items are on the way! That\'s right they\'re FREE!' +
          ' The only caveat is that we guess your delivery address.' +
          ' Fingers crossed!'
        )
        setBasket([])
      }}>Checkout</button>
    </div>
  )
}

export default Basket;