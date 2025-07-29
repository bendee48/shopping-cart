import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { routeConfig, router } from '../../routes.jsx'

describe('App integration tests', () => {
  describe('Renders the correct routes via the outlet', () => {
    it('renders the HomePage', () => {
      // create a new route instance each time (starts at root) if needed
      const routes = createMemoryRouter(routeConfig, ['/']);
      render(<RouterProvider router={routes} />);
      
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })

    it('renders the Shop page', async () => {
      const user = userEvent.setup()
      render(<RouterProvider router={router} />);

      const shopLink = screen.getAllByRole('link', { name: /shop/i })
      await user.click(shopLink[0])
      
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

  describe('Updating the basket contents', () => {
    it('increases basket count in navbar when item is added from shop', async () => {
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
      
      const shopLink = screen.getAllByRole('link', { name: /shop/i })
      await user.click(shopLink[0])
      const addButton = screen.getByRole('button', { name: /add/i })
      await user.click(addButton)

      expect(screen.getByLabelText('basket-count')).toHaveTextContent('1');
    })

    it('increases basket count in navbar when multiple items are added from shop', async () => {
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

      const shopLink = screen.getAllByRole('link', { name: /shop/i });
      await user.click(shopLink[0]);

      const buttons = screen.getAllByRole('button', { name: /add/i });
      await user.click(buttons[0]);
      await user.click(buttons[1]);
      
      expect(screen.getByLabelText('basket-count')).toHaveTextContent('2');
    });

    it('displays products on Basket page after adding items from shop', async () => {
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

      await user.click(screen.getAllByRole('link', { name: /shop/i })[0]);
      await user.click(screen.getByRole('button', { name: /add/i }));
      await user.click(screen.getByRole('link', { name: /basket/i }));
      
      expect(screen.getByTestId('basket-page')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /mug/i })).toBeInTheDocument();
    });

    it('adds correct number of items to basket', async () => {
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

      await user.click(screen.getAllByRole('link', { name: /shop/i })[0]);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '3');
      await user.click(screen.getByRole('button', { name: /add/i }));

      // check for basket count update in nav
      expect(screen.getByLabelText('basket-count')).toHaveTextContent('3')

      // go to basket page and check item with correct quantity is present
      await user.click(screen.getByRole('link', { name: /basket/i }));
      expect(screen.getByRole('spinbutton')).toHaveValue(3)
    })

    describe('Deleting items from Basket', () => {
      it('removes product from Basket page when product is deleted', async () => {
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

        await user.click(screen.getAllByRole('link', { name: /shop/i })[0]);
        await user.click(screen.getByRole('button', { name: /add/i }));
        await user.click(screen.getByRole('link', { name: /basket/i }));
        
        // BasketCard should be in the document
        expect(screen.getByRole('heading', { level: 2, name: /mug/i })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /del/i}));

        // BasketCard should no longer be in the document
        expect(screen.queryByRole('heading', { level: 2, name: /mug/i})).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: /your basket is currently empty/i })).toBeInTheDocument()
      })

      it('removes product from basket page when deleted (with a quantity of more than 1)', async () => {
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

        await user.click(screen.getAllByRole('link', { name: /shop/i })[0]);
        const addBtn = screen.getByRole('button', { name: /add/i })
        await user.click(addBtn);
        await user.click(addBtn);
        await user.click(screen.getByRole('link', { name: /basket/i }));
        
        // BasketCard should be in the document (with correct quantity)
        expect(screen.getByRole('heading', { level: 2, name: /mug/i })).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toHaveValue(2);

        // delete product
        await user.click(screen.getByRole('button', { name: /del/i}));
  
        // product should be removed
        expect(screen.queryByRole('heading', { level: 2, name: /mug/i})).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: /your basket is currently empty/i })).toBeInTheDocument()
      })

      it('decreases basket count in nav, when products are deleted from Basket', async () => {
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

        await user.click(screen.getAllByRole('link', { name: /shop/i })[0]);
        await user.click(screen.getByRole('button', { name: /add/i }));
        // basket count in nav should be 1
        expect(screen.getByLabelText('basket-count')).toHaveTextContent('1');

        // go to basket and delete product
        await user.click(screen.getByRole('link', { name: /basket/i }));
        await user.click(screen.getByRole('button', { name: /del/i}));
        
        // basket count should be 0
        expect(screen.getByLabelText('basket-count')).toHaveTextContent('0');
      })
    })
    
    describe('Updating item quantity of product in Basket', () => {
      describe('Increasing', () => {
        it('updates the item quantity, item total, the overall total and the basket count', async () => {
          const user = userEvent.setup();
          const routes = createMemoryRouter(routeConfig, ['/']);
          render(<RouterProvider router={routes} />);

          const mockProducts = [
            { id: 1, title: 'Mug', price: 5.99 },
            { id: 2, title: 'T-Shirt', price: 20.99 }
          ];

          vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProducts)
          })));

          await user.click(screen.getAllByRole('link', { name: /shop/i })[0]); // go to shop
          const btns = screen.getAllByRole('button', { name: /add/i });
          await user.click(btns[0]) // add 1 mug
          for (let i = 0; i < 3; i++) await user.click(btns[1]) // add 3 t-shirts
          // basket count in nav should be 4
          expect(screen.getByLabelText('basket-count')).toHaveTextContent('4');

          await user.click(screen.getByRole('link', { name: /basket/i })); // got to basket page
          const mugIncrementBtn = screen.getAllByRole('button', { name: '+'})[0];
          for (let i = 0; i < 3; i++) await user.click(mugIncrementBtn) // add 3 mugs

          expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(4); // mug input
          const mugTotal = mockProducts[0].price * 4;
          expect(screen.getByText(`£${mugTotal}`)).toBeInTheDocument(); // item total
          const basketTotal = mugTotal + mockProducts[1].price * 3;
          expect(screen.getByText(`Total: £${basketTotal}`)).toBeInTheDocument() // basket total
          expect(screen.getByLabelText('basket-count')).toHaveTextContent('7');
        })
      })

      describe('Decreasing', () => {
        it('decreases the item quantity, item total, the overall total and the basket count', async () => {
          const user = userEvent.setup();
          const routes = createMemoryRouter(routeConfig, ['/']);
          render(<RouterProvider router={routes} />);

          const mockProducts = [
            { id: 1, title: 'Pin', price: 1.99 },
            { id: 2, title: 'Perfume', price: 49.99 }
          ];

          vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProducts)
          })));

          await user.click(screen.getAllByRole('link', { name: /shop/i })[0]); // go to shop
          const btns = screen.getAllByRole('button', { name: /add/i });
          await user.click(btns[0]) // add 1 pin
          for (let i = 0; i < 3; i++) await user.click(btns[1]) // add 3 perfumes
          // basket count in nav should be 4
          expect(screen.getByLabelText('basket-count')).toHaveTextContent('4');

          await user.click(screen.getByRole('link', { name: /basket/i })); // go to basket page
          const perfumeDecrementBtn = screen.getAllByRole('button', { name: '-'})[1];
          for (let i = 0; i < 2; i++) await user.click(perfumeDecrementBtn) // take away 2 perfumes

          expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(1); // perfume input
          const perfumeTotal = mockProducts[1].price;
          expect(screen.getByText(`£${perfumeTotal}`)).toBeInTheDocument(); // item total
          const basketTotal = perfumeTotal + mockProducts[0].price;
          expect(screen.getByText(`Total: £${basketTotal.toFixed(2)}`)).toBeInTheDocument(); // basket total
          expect(screen.getByLabelText('basket-count')).toHaveTextContent('2');
        })
      })

      it('shouldn\'t allow the user to decrease an item past 1', async () => {
        const user = userEvent.setup();
        const routes = createMemoryRouter(routeConfig, ['/']);
        render(<RouterProvider router={routes} />);

        const mockProducts = [
          { id: 1, title: 'Scarf', price: 7.99 }
        ];

        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts)
        })));

        await user.click(screen.getAllByRole('link', { name: /shop/i })[0]); // go to shop
        await user.click(screen.getByRole('button', { name: /add/i })); // add scarf to basket
        await user.click(screen.getByRole('link', { name: /basket/i })); // go to basket page

        expect(screen.getByRole('spinbutton')).toHaveValue(1);
        await user.click(screen.getByRole('button', { name: '-'}));
        // should still show 1 in the input element after decrementing
        expect(screen.getByRole('spinbutton')).toHaveValue(1);
      })

      it('should disable decrement button if quantity is 1', async () => {
        const user = userEvent.setup();
        const routes = createMemoryRouter(routeConfig, ['/']);
        render(<RouterProvider router={routes} />);

        const mockProducts = [
          { id: 1, title: 'Scarf', price: 7.99 }
        ];

        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts)
        })));

        await user.click(screen.getAllByRole('link', { name: /shop/i })[0]); // go to shop
        await user.click(screen.getByRole('button', { name: /add/i })); // add scarf to basket
        await user.click(screen.getByRole('link', { name: /basket/i })); // go to basket page

        expect(screen.getByRole('spinbutton')).toHaveValue(1)
        expect(screen.getByRole('button', { name: '-' })).toBeDisabled();
        screen.debug()
      })
    })

  })
});