import { useEffect, useState } from "react";
import ShopCard from './ShopCard.jsx';
import styles from './Shop.module.css';

function Shop() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products",{ mode: "cors" });
        if (!response.ok) {
          throw new Error(`Something went wrong... Status: ${response.status}`)
        }
        const data = await response.json();
        console.log(data, 'great success')
        setProducts(data)
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
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>Something has gone wrong...</h1>
  }

  return (
    <>
      <h1>The products have loaded!!</h1>
      <div className={styles.products_container}>
        {products.map(product => <ShopCard key={product.id} product={product}/>)}
      </div>
    </>
  )

}

export default Shop;