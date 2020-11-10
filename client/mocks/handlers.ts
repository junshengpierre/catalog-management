import { productList } from './fixtures'
import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost/product', (req, res, ctx) => {
    return res(ctx.json(productList))
  }),
]
