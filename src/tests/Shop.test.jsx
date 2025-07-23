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
  it('renders the component', () => {
    const { container } = render(<MemoryRouter><Shop /></MemoryRouter>)
  
    expect(container).toMatchSnapshot();
  })

  it('shows a loading message whilst fetching products', () => {
    render(<MemoryRouter><Shop /></MemoryRouter>);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  })

  it('displays an error message if fetch fails', async () => {
    const fetchFail = vi.fn(() => {
      return Promise.reject(new Error('Oh shit'))
    });
    vi.stubGlobal('fetch', fetchFail);

    await act(async () => {
      render(<MemoryRouter><Shop /></MemoryRouter>);
    })

    expect(screen.getByText(/something has gone wrong/i)).toBeInTheDocument();
  })

  it('displays products', async () => {
    const products = [
      {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99},
      {id: 2, title: 'Beanie', description: 'A blue beanie', price: 4.99},
    ];

    // mock the fetch request
    const mockFetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(products)
        }
      })
    });

    vi.stubGlobal('fetch', mockFetch)

    // act runs state updates and enqueued effects (useEffect)
    await act(async () => {
      render(<MemoryRouter><Shop /></MemoryRouter>);
    })

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
    expect(screen.getByText('A red t-shirt')).toBeInTheDocument();
  })
})