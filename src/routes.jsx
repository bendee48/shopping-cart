import { createBrowserRouter } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page.jsx'
import HomePage from './routes/HomePage'
import ShopPage from './routes/ShopPage'
import BasketPage from './routes/BasketPage'

const routeConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'basket', element: <BasketPage /> },
    ]
  },
]

const router = createBrowserRouter(routeConfig);

export { router, routeConfig };