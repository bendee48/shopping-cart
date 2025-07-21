import { Link } from "react-router-dom"
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.homepage} data-testid="homepage">
      <Link to={'/shop'}><button className={styles.shop_btn}>Shop</button></Link>
    </div>
  )
}

export default HomePage;