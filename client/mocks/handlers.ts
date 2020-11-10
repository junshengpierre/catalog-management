import { productList } from './fixtures'
import { rest } from 'msw'

// INFO: Unsure why `http://localhost` domain works.
// Maybe because process.env.API_URI is undefined
// in test environment and we might need to find a
// way to mock it.
export const handlers = [
  rest.get('http://localhost/product', (req, res, ctx) => {
    return res(ctx.json(productList))
  }),
]
