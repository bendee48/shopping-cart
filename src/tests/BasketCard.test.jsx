import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import BasketCard from '../components/BasketCard';

describe('BasketCard component', () => {
  it('renders a BasketCard', () => {
    const product = { image: 't-shirt.jpg', title: 'Blue t-shirt', quantity: 2, price: 11.99 }
    const { container } = render(<MemoryRouter><BasketCard product={product}/></MemoryRouter>);
    
    expect(container).toMatchSnapshot();
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
})