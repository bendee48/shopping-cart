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
  
  describe('Adding product to basket button', () => {
    it('calls the handleAddToBasket function', async () => {
      const user = userEvent.setup();
  
      const product = {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg'}
      render(<MemoryRouter><ShopCard product={product}/></MemoryRouter>)
  
      const addButton = screen.getByRole('button');
      await user.click(addButton);
  
      expect(handleAddToBasketMock).toHaveBeenCalledWith(product, '1')
    })
  })
})
