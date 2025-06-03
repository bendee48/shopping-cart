import styles from "./BasketCard.module.css"

function BasketCard({product}) {
  return (
    <div className={styles.basket_card}>
      <img className={styles.product_image} src={product.image} alt={product.title} />
      <h2 className={styles.product_title}>{product.title}</h2>
      <p>{product.quantity} item{product.quantity > 1 ? 's' : ''}</p>
      <p>Total: £{product.quantity * product.price}</p>
    </div>
  )
}

export default BasketCard;