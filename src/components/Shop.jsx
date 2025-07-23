import { useEffect, useState } from "react";
import ShopCard from './ShopCard.jsx';
import styles from './Shop.module.css';

/**
 * Shop component that fetches and displays a list of products.
 *
 * It handles loading and error states, and renders a `ShopCard` for each product.
 *
 * @component
 * @returns {JSX.Element} The rendered Shop component.
 */
function Shop() {
   /** @type {[Array<Object> | null, Function]} */
  const [products, setProducts] = useState(null);
  /** @type {[boolean, Function]} */
  const [loading, setLoading] = useState(true);
  /** @type {[string | null, Function]} */
  const [error, setError] = useState(null);

  useEffect(() => {
     /**
     * Fetches product data from the API and sets the component state.
     * Handles success, error, and completion cases.
     *
     * @async
     * @returns {Promise<void>}
     */
    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products",{ mode: "cors" });
        if (!response.ok) {
          throw new Error(`Something went wrong... Status: ${response.status}`)
        }
        const data = await response.json();
        setProducts(data);
      } catch(e) {
        setError(e.message)
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, []);

  if (loading) {
    return <p className={styles.message}>Loading...</p>
  }

  if (error) {
    return <p className={styles.message}>Something has gone wrong...</p>
  }

  return (
    <>
      <div className={styles.products_container}>
        {products.map(product => <ShopCard key={product.id} product={product}/>)}
      </div>
    </>
  )

}

export default Shop;