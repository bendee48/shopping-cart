import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react"
import Shop from "../components/Shop"

describe('test 1', () => {
  it('should be true', () => {
    expect(true).toBe(true)
  })
})

describe('testing component rendering', () => {
  it('displays component', () => {
    const foo = render(<Shop />)
    
    screen.debug()
  })
})

