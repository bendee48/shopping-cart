import { useState } from "react";
import styles from "./BasketCard.module.css"
import { useOutletContext } from "react-router-dom";

/**
 * Component that displays a product card in the basket, showing its image, title, quantity, and total price.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product to display in the basket.
 * @param {number} props.id - Unique identifier for the product
 * @param {string} props.product.image - URL of the product image.
 * @param {string} props.product.title - Title or name of the product.
 * @param {number} props.product.quantity - Quantity of the product in the basket.
 * @param {number} props.product.price - Price per unit of the product.
 *
 * @returns {JSX.Element} The rendered basket card component.
 */
function BasketCard({product}) {
  const { handleRemoveFromBasket, handleAddToBasket, handleDecreaseItemQuantity } = useOutletContext();
  const [itemQuantity, setItemQuantity] = useState(product.quantity);
  const isDisabled = product.quantity <= 1;

  function handleIncrement() {
    setItemQuantity(n => n + 1);
    handleAddToBasket(product, 1);
  }

  function handleDecrement() {
    if (itemQuantity > 1) {
      setItemQuantity(n => n - 1);
      handleDecreaseItemQuantity(product.id);
    }
  }

  return (
    <div data-testid='basket-card' className={styles.basket_card}>
      <img className={styles.bcard_image} src={product.image} alt={product.title} />
      <h2 className={styles.bcard_title}>{product.title}</h2>
      {/* <p className={styles.bcard_items}>{product.quantity} item{product.quantity > 1 ? 's' : ''}</p> */}
      <div className={styles.item_quantity}>
        <button className={styles.decrement} onClick={handleDecrement} disabled={isDisabled}>-</button>
        <input className={styles.bcard_input} type="number" min='1' value={itemQuantity} readOnly/>
        <button className={styles.increment} onClick={handleIncrement}>+</button>
      </div>
      <p className={styles.bcard_price}>£{(product.quantity * product.price).toFixed(2)}</p>
      <button className={styles.bcard_btn} name="delete" onClick={() => {
        handleRemoveFromBasket(product.id)
      }}>
        Del
      </button>
    </div>
  )
}

export default BasketCard;