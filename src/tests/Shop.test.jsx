import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import Shop from '../components/Shop';

// Mock ShopCard component
vi.mock('../components/ShopCard', () => {
    return {
      default: vi.fn(({product}) => {
        return (
          <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <form>
              <input type="number" defaultValue="1"/>
              <button>Add to Basket</button>
            </form>
          </div>
        )
      })
    }
})

describe('Shop component', () => {
  it('renders the Shop', () => {
    const { container } = render(<MemoryRouter><Shop /></MemoryRouter>)
    
    expect(container).toMatchSnapshot();
  })

  it('displays products', async () => {
    const products = [
      {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99},
      {id: 2, title: 'Beanie', description: 'A blue beanie', price: 4.99},
    ];

    // mock the fetch request
    const mockFetch = vi.fn(() => {
      return Promise.resolve({
        ok: '500',
        json: () => {
          return Promise.resolve(products)
        }
      })
    });

    vi.stubGlobal('fetch', mockFetch)

    // act runs state updates and enqueued effects (useEffect)
    await act(() => {
      render(<MemoryRouter><Shop /></MemoryRouter>);
    })
    
    expect(screen.getByText('A red t-shirt')).toBeInTheDocument();
  })
})