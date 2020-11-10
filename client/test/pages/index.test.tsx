import React from 'react'
import { render, waitFor } from '../testUtils'
import { Home } from '../../pages/index'
import { productList } from '../../mocks/fixtures'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // TOOD: Implement failure handling tests
  // REf: https://github.com/mswjs/msw/issues/104#issuecomment-635050088
  it('should fetch and display a list of products', async () => {
    const { getByText, queryByText, queryAllByText, getAllByTestId } = render(
      <Home />,
      {}
    )

    expect(getByText('Loading...')).toBeDefined()
    expect(getByText('Catalog Management System')).toBeDefined()

    await waitFor(() =>
      expect(getAllByTestId('productListItem').length).toEqual(2)
    )

    expect(queryByText('Loading...')).toBeNull()
    expect(queryByText(productList[0].title)).not.toBeNull()
    expect(queryByText(productList[0].description)).not.toBeNull()
    expect(queryAllByText(/Quantity/)).not.toBeNull()
    expect(queryAllByText(/Price/)).not.toBeNull()
    expect(queryAllByText(/Status/)).not.toBeNull()
  })

  // TODO: Test add product flow
  // it('should be able to add new product', async () => {
  // })
})
