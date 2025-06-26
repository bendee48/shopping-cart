import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('NavBar Component', () => {
  it('renders the Navbar', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar/>  
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  })

  it('displays the Navbar\'s links', () => {
    render(
      <MemoryRouter>
        <Navbar/>  
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /shop/i })).toHaveAttribute('href', '/shop');
    expect(screen.getByRole('link', { name: /basket/i })).toHaveAttribute('href', '/basket');
  })

  it('displays the number of items in the basket', () => {
    render(
      <MemoryRouter>
        <Navbar basketCount={3}/>  
      </MemoryRouter>
    );
    
    expect(screen.getByText('3')).toBeInTheDocument();
  })
})

