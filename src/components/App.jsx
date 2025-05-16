import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'

function App() {
  const [basket, setBasket] = useState([1,2,3]);
  const basketCount = basket.length;

  return (
    <>
      <Navbar basketCount={basketCount}/>
      <div>
        <Outlet context={'hello'}/>
      </div>
    </>
  )
}

export default App;