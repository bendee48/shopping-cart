import { useEffect, useState } from "react";

function useProducts() {
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

  return { products, loading, error }
}

export default useProducts;