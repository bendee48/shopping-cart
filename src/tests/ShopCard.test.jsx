import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from 'react-router-dom';
import ShopCard from '../components/ShopCard';

const handleAddToBasketMock = vi.fn();
// Mocking useOutletContext
vi.mock(import('react-router-dom'), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useOutletContext: () => ({
      handleAddToBasket: handleAddToBasketMock
    })
  }
})

describe('ShopCard component', () => {
  it('renders a ShopCard', () => {
    const product = {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg'}
    const container = render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)

    expect(container).toMatchSnapshot();
  })

  it('displays a picture for the product', () => {
    const product =  {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg' }
    render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)
    
    expect(screen.getByRole('img', { name: 'T-Shirt'})).toBeInTheDocument();
  })

  it('displays a title for the product', () => {
    const product =  {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg' }
    render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)
    
    expect(screen.getByRole('heading', { level: 2, name: 'T-Shirt'})).toBeInTheDocument();
  })

  it('displays a description for the product', () => {
    const product =  {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg' }
    render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)
    
    expect(screen.getByText('A red t-shirt')).toBeInTheDocument();
  })

  it('displays the product price', () => {
    const product =  {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg' }
    render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)

    expect(screen.getByText('£10.99')).toBeInTheDocument()
  })

  it('displays the price in the correct format', () => {
    const product1 =  {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.9, image: 'tshirt.jpg' }
    const product2 =  {id: 1, title: 'Bag', description: 'A leather bag', price: 15, image: 'bag.jpg' }
    render(<MemoryRouter><ShopCard product={product1}/></MemoryRouter>)
    render(<MemoryRouter><ShopCard product={product2}/></MemoryRouter>)
    
    expect(screen.getByText('£10.90')).toBeInTheDocument();
    expect(screen.getByText('£15.00')).toBeInTheDocument();
  })
  
  describe('Adding product to basket button', () => {
    it('calls the handleAddToBasket function with correct product and quantity', async () => {
      const user = userEvent.setup();
  
      const product = {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg'}
      render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)
  
      const addButton = screen.getByRole('button');
      await user.click(addButton);
  
      expect(handleAddToBasketMock).toHaveBeenCalledWith(product, '1')
    })

    it('calls the handleAddToBasket function with an updated quantity', async () => {
      const user = userEvent.setup();

      const product = {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg'}
      render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>);

      const quantityInput = screen.getByRole('spinbutton');
      await user.clear(quantityInput);
      await user.type(quantityInput, '3')

      const addButton = screen.getByRole('button');
      await user.click(addButton);
      
      expect(handleAddToBasketMock).toHaveBeenCalledWith(product, '3')
    })
  })
})
