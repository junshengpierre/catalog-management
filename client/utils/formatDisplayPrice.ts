import currency from 'currency.js'

export function formatDisplayPrice(value: number): string {
  return currency(value, { symbol: '$', fromCents: true }).format()
}
