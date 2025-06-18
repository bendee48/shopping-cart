import { useRef } from 'react'
import { useOutletContext } from "react-router-dom";
import styles from './ShopCard.module.css'

function ShopCard({product}) {
  const { handleAddToBasket } = useOutletContext()
  
  // no need for amount input to be state, using ref instead
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
        {/* use defaultValue to access current value from ref */}
        <input className={styles.card_input} id={styles.amount} type="number" ref={inputRef} defaultValue="1"/>
        <button className={styles.card_btn} onClick={handleSubmit}>Add to Basket</button>
      </form>
    </div>
  )
}

export default ShopCard;