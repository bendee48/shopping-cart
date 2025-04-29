import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react"
import Shop from "../routes/Shop"

describe('test 1', () => {
  it('should be true', () => {
    expect(true).toBe(true)
  })
})

describe('testing component rendering', () => {
  it('displays component', () => {
    render(<Shop />)
  
    screen.debug()
  })
})

