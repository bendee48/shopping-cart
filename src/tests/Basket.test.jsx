import { expect, describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
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
  it('renders the basket', () => {
    const container = render(<MemoryRouter><Basket/></MemoryRouter>);

    expect(container).toMatchSnapshot();
  })

  describe('with items in basket', () => {
    it('renders the products', () => {
      const basket = [{id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99, image: 'tshirt.jpg', quantity: 2}]
      basketMock.mockReturnValue(basket)
      const container = render(<MemoryRouter><Basket/></MemoryRouter>)
      
      expect(container).toMatchSnapshot()
    })
  })
})