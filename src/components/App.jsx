import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import styles from './App.module.css'

/**
 * App component for the shopping cart application.
 * Manages global basket state and provides it via Outlet context.
 *
 * @returns {JSX.Element} The main application layout with navbar and routed content.
 */
function App() {
  /** 
   * @typedef {Object} Product
   * @property {number} id - Unique identifier of the product
   * @property {string} title - Name of the product
   * @property {string} image - Image url
   * @property {number} quantity - Quantity of the product in the basket
   * @property {number} price - Optional price of the product
   */

  /** @type {[Product[], Function]} */
  const [basket, setBasket] = useState([]);
  const basketCount = countItems();

  /**
   * Calculates the total number of items in the basket.
   *
   * @returns {number} Total quantity of all products in the basket.
   */
  function countItems() {
    return basket.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0)
  }

  /**
   * Adds a product to the basket or updates quantity if it already exists.
   *
   * @param {Product} product - The product to add or update.
   * @param {number|string} quantity - Quantity to add to the basket.
   */
  function handleAddToBasket(product, quantity) {
    let inBasket = false;
    // go through basket and add to quanitity if product is already in basket
    let newBasket = basket.map(item => {
      if (item.id == product.id) {
        inBasket = true;
        return {...item, quantity: item.quantity + Number(quantity)}
      } else {
        return item
      }
    })

    // if product wasn't in basket, add now
    if (!inBasket) {
      newBasket = [...newBasket, {...product, quantity: Number(quantity)}]
    }
    
    setBasket(newBasket);
  }

  function handleRemoveFromBasket(id) {
    const filteredProducts = basket.filter(product => product.id != id);
    setBasket(filteredProducts);
  }

  function handleDecreaseItemQuantity(id) {
    const newBasket = basket.map(product => {
      if (product.id == id) {
        return {...product, quantity: product.quantity - 1}
      } else {
        return product;
      }
    })
    setBasket(newBasket)
  }

  return (
    <div className={styles.app}>
      <Navbar basketCount={basketCount}/>
      <div className={styles.outlet}>
        <Outlet context={{basket, setBasket, handleAddToBasket, handleRemoveFromBasket, handleDecreaseItemQuantity}}/>
      </div>
    </div>
  )
}

export default App;