import { Link } from "react-router-dom";

/**
 * A navigation bar component.
 * 
 * Displays links to the Home, Shop, and Basket pages.
 * Also shows the current number of items in the basket.
 *
 * @component
 * @param {{ basketCount: number }} props
 * @param {number} props.basketCount - The number of items currently in the user's basket.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar({basketCount = 0}) {
  return (
    <nav>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'shop'}>Shop</Link></li>
        <li><Link to={'basket'}>Basket</Link><span aria-label="basket-count">{basketCount}</span></li>
      </ul>
    </nav>
  )
}

export default Navbar;