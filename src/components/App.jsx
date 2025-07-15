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

  return (
    <>
      <Navbar basketCount={basketCount}/>
      <div>
        <Outlet context={{basket, handleAddToBasket}}/>
      </div>
    </>
  )
}

export default App;