import currency from 'currency.js'

export function formatDisplayPrice(
  value: number,
  withSymbol?: boolean
): string {
  return currency(value, {
    symbol: withSymbol ? '$' : '',
    fromCents: true,
  }).format()
}
