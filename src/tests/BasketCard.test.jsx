import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event"
import BasketCard from '../components/BasketCard';

const handleRemoveFromBasketMock = vi.fn();
// Mocking useOutletContext
vi.mock(import('react-router-dom'), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useOutletContext: () => ({
      handleRemoveFromBasket: handleRemoveFromBasketMock
    })
  }
})

describe('BasketCard component', () => {
  it('renders a BasketCard', () => {
    const product = { image: 't-shirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }
    const { container } = render(<MemoryRouter><BasketCard product={product}/></MemoryRouter>);
    
    expect(container).toMatchSnapshot();
  })

  it('shows the product image', () => {
    const quantity = { image: 'blueTshirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }

    render(<MemoryRouter><BasketCard product={quantity}/></MemoryRouter>);

    expect(screen.getByRole('img', { name: /blue t-shirt/i })).toBeInTheDocument()
  })

  it('shows the product title', () => {
    const quantity = { image: 'blueTshirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }

    render(<MemoryRouter><BasketCard product={quantity}/></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 2, name: /blue t-shirt/i })).toBeInTheDocument()
  })

  it('shows the item quantity', () => {
    const quantity = { image: 'blueTshirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }

    render(<MemoryRouter><BasketCard product={quantity}/></MemoryRouter>);

    expect(screen.getByText(/2 items/i)).toBeInTheDocument()
  })

  it('shows correct price based on quantity of items', () => {
    const quantity1 = { image: 'blueTshirt.jpg', title: 'Blue t-shirt', quantity: 1, price: 11.99 }
    const quantity2 = { image: 'blueTshirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }
    const totalPrice = quantity2.quantity * quantity2.price

    render(<MemoryRouter><BasketCard product={quantity1}/></MemoryRouter>);
    render(<MemoryRouter><BasketCard product={quantity2}/></MemoryRouter>);
  
    // quantity of 1
    expect(screen.getByText(`£11.99`)).toBeInTheDocument();
    // quantity of 2
    expect(screen.getByText(`£${totalPrice}`)).toBeInTheDocument();
  })

  it('displays price in correct format', () => {
    const product1 = { image: 't-shirt.jpg', title: 'Blue t-shirt', quantity: 1, price: 11.9 }
    const product2 = { image: 'bag.jpg', title: 'Black bag', quantity: 1, price: 21 }

    render(<MemoryRouter><BasketCard product={product1}/></MemoryRouter>);
    render(<MemoryRouter><BasketCard product={product2}/></MemoryRouter>);

    expect(screen.getByText('£11.90')).toBeInTheDocument();
    expect(screen.getByText('£21.00')).toBeInTheDocument();
  })

  it('displays correct pluralization', () => {
    const single = { image: null, title: '', quantity: 1, price: 11.99 }
    const multiple = { image: null, title: '', quantity: 3, price: 11.99 }

    render(<MemoryRouter><BasketCard product={single}/></MemoryRouter>);
    render(<MemoryRouter><BasketCard product={multiple}/></MemoryRouter>);
    
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(screen.getByText('3 items')).toBeInTheDocument();
  })

  describe('removing a Basket Card', () => {
    it('displays a button to delete product', () => {
      const product = { image: 't-shirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }
      render(<MemoryRouter><BasketCard product={product}/></MemoryRouter>);
      
      expect(screen.getByRole('button', { name: /del/i })).toBeInTheDocument()
    })
  
    it('calls the handleRemoveFromBasket function with a product id', async () => {
      const user = userEvent.setup();
      const product = { id: 1, image: 't-shirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }
      render(<MemoryRouter><BasketCard product={product}/></MemoryRouter>);

      const delBtn = screen.getByRole('button', { name: /del/i })
      await user.click(delBtn)
      
      expect(handleRemoveFromBasketMock).toHaveBeenCalledWith(1);
    })
  })
})