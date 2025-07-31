import { useRef } from 'react'
import { useOutletContext } from "react-router-dom";
import styles from './ShopCard.module.css'

/**
 * Component for a product card with image, title, description, price, 
 * and a form to add a specified quantity of the product to the basket.
 * 
 * Uses `useRef` to reference the quantity input and `useOutletContext` 
 * to access the `handleAddToBasket` function from a parent route.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.product - The product object to display
 * @param {number|string} props.product.id - Unique identifier for the product
 * @param {string} props.product.title - Name of the product
 * @param {string} props.product.description - Short description of the product
 * @param {number} props.product.price - Price of the product in GBP
 * @param {string} props.product.image - Image URL for the product
 * @returns {JSX.Element} A card element displaying product details and an add-to-basket form
 */
function ShopCard({product}) {
  const { handleAddToBasket } = useOutletContext()

  // no need for amount input to be state, using ref instead
  const inputRef = useRef()

  /**
   * Handles form submission by preventing default behavior
   * and calling `handleAddToBasket` with the product and quantity.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  function handleSubmit(e) {
    e.preventDefault()
    const quantity = inputRef.current.value;
    handleAddToBasket(product, quantity)
  }
  
  return (
    <div className={styles.card}>
      <img className={styles.card_img} src={product.image} alt={product.title} />
      <h2 className={styles.card_title}>{product.title}</h2>
      <p className={styles.card_desc}>{product.description}</p>
      <p className={styles.card_price}>£{product.price.toFixed(2)}</p>
      <form className={styles.card_form} onSubmit={handleSubmit}>
        {/* use defaultValue to access current value from ref */}
        <input className={styles.card_input} id={styles.amount} name="input" type="number" min='1' ref={inputRef} defaultValue="1"/>
        <button className={styles.card_btn} name="add-btn">Add</button>
      </form>
    </div>
  )
}

export default ShopCard;