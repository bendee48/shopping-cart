import { Link } from "react-router-dom";
import styles from './Navbar.module.css'
import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';

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
    <nav className={styles.navbar} data-testid='navbar'>
      <div className="container">
        <ul className={styles.navbar_contents}>
          <div className={styles.left_items}>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'shop'}>Shop</Link></li>
          </div>
          <div className={styles.right_items}>
            <li>
              <Link to={'basket'}>
                <Icon 
                  path={mdiBasket}
                  className={styles.basket_icon}
                  title="Basket"
                  size={1}
                  color="currentColor"
                />
                <span className={styles.basket_count} aria-label="basket-count">{basketCount}</span>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;