import { useEffect, useState } from "react";

function Shop() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Something went wrong... Status: ${response.status}`)
        }
        const data = await response.json();
        setProducts(data)
      } catch(e) {
        setError(e.message)
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  });

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>Something has gone wrong...</h1>
  }

  return (
    <>
      <h1>The products have loaded!!</h1>
    </>
  )

}

export default Shop;