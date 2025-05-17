import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'

function App() {
  const [basket, setBasket] = useState([]);
  const basketCount = countItems();

  // count the quantityt of each product in basket
  function countItems() {
    return basket.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0)
  }

  function handleAddToBasket(product, quantity) {
    setBasket([...basket, {...product, quantity: Number(quantity)}])
  }

  console.log(basket)

  return (
    <>
      <Navbar basketCount={basketCount}/>
      <div>
        <Outlet context={handleAddToBasket}/>
      </div>
    </>
  )
}

export default App;