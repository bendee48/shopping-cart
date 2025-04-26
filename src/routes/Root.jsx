import { Outlet, Link } from "react-router-dom"

function Root() {
  return (
    <>
      <nav>A sweet nav bar is going to go here</nav>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'shop'}>Shop</Link></li>
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Root;