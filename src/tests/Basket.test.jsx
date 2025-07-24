import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Basket from '../components/Basket';

// Mock for basket
const basketMock = vi.fn();
basketMock.mockReturnValue([]);

// Mocking useOutletContext
vi.mock(import('react-router-dom'), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useOutletContext: () => ({
      basket: basketMock()
    })
  }
})

describe('Basket Component', () => {
  describe('without items in basket', () => {
    it('renders the basket', () => {
      const container = render(<MemoryRouter><Basket/></MemoryRouter>);
  
      expect(container).toMatchSnapshot();
    })
  
    it('lets the user know the basket is empty', () => {
      render(<MemoryRouter><Basket/></MemoryRouter>);
      
      expect(screen.getByRole('heading', { name: /your basket is currently empty/i })).toBeInTheDocument();
    })

    it('provides a link to the shop', () => {
      render(<MemoryRouter><Basket/></MemoryRouter>);
      
      expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    })

    it('doesn\'t show a basket total', () => {
      render(<MemoryRouter><Basket/></MemoryRouter>);
      
      expect(screen.queryByTestId('basket-total')).not.toBeInTheDocument();
    })
  })

  describe('with items in basket', () => {
    it('renders the products', () => {
      const basket = [
        {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg', quantity: 2},
        {id: 2, title: 'Scarf', description: 'A purple scarf', price: 7.99, image: 'scarf.jpg', quantity: 1},
      ]
      basketMock.mockReturnValueOnce(basket)
      render(<MemoryRouter><Basket/></MemoryRouter>)
      
      expect(screen.getAllByTestId('basket-card')).toHaveLength(2);
    })

    it('shows the basket total', () => {
      const basket = [
        {id: 1, title: 'Shorts', description: 'A pair of blue shorts', price: 8.99, image: 'shorts.jpg', quantity: 2},
        {id: 2, title: 'Shoes', description: 'A pair of black shoes', price: 39.99, image: 'shoes.jpg', quantity: 1},
      ]
      basketMock.mockReturnValueOnce(basket)
      render(<MemoryRouter><Basket/></MemoryRouter>)
      
      expect(screen.getByText('Total: £57.97')).toBeInTheDocument();
    })

    it('shows basket total in correct format', () => {
      const basket = [
        {id: 1, title: 'Shorts', description: 'A pair of blue shorts', price: 10.1, image: 'shorts.jpg', quantity: 1},
        {id: 2, title: 'Shoes', description: 'A pair of black shoes', price: 12.2, image: 'shoes.jpg', quantity: 1},
      ] 
      basketMock.mockReturnValueOnce(basket)
      render(<MemoryRouter><Basket/></MemoryRouter>)
    
      expect(screen.getByText(/£22.30/)).toBeInTheDocument()
    })
  })
})