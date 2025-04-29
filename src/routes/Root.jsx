import { Outlet, Link } from "react-router-dom"

function Root() {
  return (
    <>
      <nav>
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