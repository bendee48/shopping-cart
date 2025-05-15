import styles from './Card.module.css'

function Card({product}) {
  return (
    <div className={styles.card}>
      <img className={styles.card_img} src={product.image} alt={product.title} />
      <h2 className={styles.card_title}>{product.title}</h2>
      <p className={styles.card_desc}>{product.description}</p>
      <p>{product.price}</p>
      <input className={styles.card_input} id={styles.amount} type="number" placeholder='1'/>
      <button className={styles.card_btn}>Add to Cart</button>
    </div>
  )
}

export default Card;