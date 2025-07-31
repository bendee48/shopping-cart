import ShopCard from './ShopCard.jsx';
import styles from './Shop.module.css';
import useProducts from '../hooks/useProducts'

/**
 * Shop component that fetches and displays a list of products.
 *
 * It handles loading and error states, and renders a `ShopCard` for each product.
 *
 * @component
 * @returns {JSX.Element} The rendered Shop component.
 */
function Shop() {
  const { products, loading, error } = useProducts();

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