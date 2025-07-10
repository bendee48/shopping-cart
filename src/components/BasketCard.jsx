import styles from "./BasketCard.module.css"

/**
 * Component that displays a product card in the basket, showing its image, title, quantity, and total price.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product to display in the basket.
 * @param {string} props.product.image - URL of the product image.
 * @param {string} props.product.title - Title or name of the product.
 * @param {number} props.product.quantity - Quantity of the product in the basket.
 * @param {number} props.product.price - Price per unit of the product.
 *
 * @returns {JSX.Element} The rendered basket card component.
 */
function BasketCard({product}) {
  return (
    <div data-testid='basket-card' className={styles.basket_card}>
      <img className={styles.product_image} src={product.image} alt={product.title} />
      <h2 className={styles.product_title}>{product.title}</h2>
      <p>{product.quantity} item{product.quantity > 1 ? 's' : ''}</p>
      <p>Total: £{product.quantity * product.price}</p>
    </div>
  )
}

export default BasketCard;