import currency from 'currency.js'

export function formatDisplayPrice(value: number) {
  return currency(value, { symbol: '$', fromCents: true }).format()
}
