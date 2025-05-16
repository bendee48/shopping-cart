import { Link } from "react-router-dom";

function Navbar({basketCount}) {
  return (
    <nav>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'shop'}>Shop</Link></li>
        <li><Link to={'basket'}>Basket</Link><span>{basketCount}</span></li>
      </ul>
    </nav>
  )
}

export default Navbar;