import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import HomePage from "../routes/HomePage";

describe('HomePage route component', () => {
  it('renders the homepage route', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
  })
  
  it('displays a link to the shop', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  })
})