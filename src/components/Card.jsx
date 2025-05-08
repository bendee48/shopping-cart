import styles from './Card.module.css'

function Card({url, title, desc}) {
  return (
    <div className={styles.card}>
      <img className={styles.card_img} src="#" alt="A card" />
      <h2 className={styles.card_title}>Item Title</h2>
      <p className={styles.card_desc}>Item blurb</p>
      <input className={styles.card_input} type="number" />
      <button className={styles.card_btn}>Add to Cart</button>
    </div>
  )
}

export default Card;