import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { routeConfig, router } from '../../routes.jsx'

describe('App integration tests', () => {
  describe('renders the correct routes via the outlet', () => {
    it('renders the HomePage', () => {
      // create a new route instance each time (starts at root) if needed
      const routes = createMemoryRouter(routeConfig, ['/']);
      render(<RouterProvider router={routes} />);
      
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })

    it('renders the Shop page', async () => {
      const user = userEvent.setup()
      render(<RouterProvider router={router} />);

      const shopLink = screen.getByRole('link', { name: /shop/i })
      await user.click(shopLink)
      
      expect(screen.getByTestId('shop-page')).toBeInTheDocument();
    })
    
    it('renders the basket page', async () => {
      const user = userEvent.setup()
      const routes = createMemoryRouter(routeConfig, ['/']);
      render(<RouterProvider router={routes} />);
      
      const basketLink = screen.getByRole('link', { name: /basket/i });
      await user.click(basketLink)

      expect(screen.getByTestId('basket-page')).toBeInTheDocument();
    })
  })

  it('updates basket count in navbar when item is added from shop', async () => {
    const user = userEvent.setup()
    const routes = createMemoryRouter(routeConfig, ['/']);
    render(<RouterProvider router={routes} />);

    const products = [
      {id: 1, title: 'T-Shirt', description: 'A red t-shirt', price: 10.99},
    ];

    // mock the fetch request in Shop
    const mockFetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(products)
        }
      })
    });
    vi.stubGlobal('fetch', mockFetch)
    
    const shopLink = screen.getByRole('link', { name: /shop/i })
    await user.click(shopLink)
    const addButton = screen.getByRole('button', { name: /add to basket/i })
    await user.click(addButton)

    expect(screen.getByLabelText('basket-count')).toHaveTextContent('1');
  })

  it('updates basket count in navbar when multiple items are added from shop', async () => {
    const user = userEvent.setup();
    const routes = createMemoryRouter(routeConfig, ['/']);
    render(<RouterProvider router={routes} />);

    const mockProducts = [
      { id: 1, title: 'Shirt', price: 10.99 },
      { id: 2, title: 'Jeans', price: 29.99 }
    ];

    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    })));

    const shopLink = screen.getByRole('link', { name: /shop/i });
    await user.click(shopLink);

    const buttons = screen.getAllByRole('button', { name: /add to basket/i });
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    
    expect(screen.getByLabelText('basket-count')).toHaveTextContent('2');
  });

  it('displays basket contents after adding items from shop', async () => {
    const user = userEvent.setup();
    const routes = createMemoryRouter(routeConfig, ['/']);
    render(<RouterProvider router={routes} />);

    const mockProducts = [
      { id: 1, title: 'Mug', price: 5.99 }
    ];

    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    })));

    await user.click(screen.getByRole('link', { name: /shop/i }));
    await user.click(screen.getByRole('button', { name: /add to basket/i }));
    await user.click(screen.getByRole('link', { name: /basket/i }));
    
    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mug/i })).toBeInTheDocument();
  });
});