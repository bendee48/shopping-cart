import { Outlet, Link } from "react-router-dom"
import styles from './Root.module.css'

function Root() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'shop'}>Shop</Link></li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Root;