import { formatDisplayPrice } from './formatDisplayPrice'

describe('formatDisplayPrice', () => {
  it('should return currency format', () => {
    expect(formatDisplayPrice(91)).toEqual('$0.91')
    expect(formatDisplayPrice(100)).toEqual('$1.00')
    expect(formatDisplayPrice(100010)).toEqual('$1,000.10')
  })
})
