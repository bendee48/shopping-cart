import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App'

describe('App Component', () => {
  it('renders the App', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  })

  it('renders the NavBar component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  })
})