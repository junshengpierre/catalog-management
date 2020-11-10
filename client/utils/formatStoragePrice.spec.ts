import { formatStoragePrice } from './formatStoragePrice'

describe('formatStoragePrice', () => {
  it('should return cents', () => {
    expect(formatStoragePrice(-9.1)).toEqual(910)
    expect(formatStoragePrice(99.1111)).toEqual(9911)
    expect(formatStoragePrice(10)).toEqual(1000)
  })
})
