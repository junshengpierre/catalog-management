import currency from 'currency.js'

export function formatStoragePrice(value: number): number {
  return currency(Math.abs(value)).value * 100
}
