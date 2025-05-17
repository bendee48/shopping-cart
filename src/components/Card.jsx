import { useRef } from 'react'
import { useOutletContext } from "react-router-dom";
import styles from './Card.module.css'

function Card({product}) {
  const handleAddToBasket = useOutletContext()
  const inputRef = useRef()

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
      <p>{product.price}</p>
      <form onSubmit={handleSubmit}>
        <input className={styles.card_input} id={styles.amount} type="number" ref={inputRef} defaultValue="1"/>
        <button className={styles.card_btn} onClick={handleSubmit}>Add to Basket</button>
      </form>
    </div>
  )
}

export default Card;