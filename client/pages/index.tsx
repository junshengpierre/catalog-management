import {
  Button,
  Container,
  Card,
  Alert,
  CardColumns,
  Spinner,
} from 'react-bootstrap'
import { MainLayout, ProductEmptyImage } from '../components'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import isEmpty from 'lodash/isEmpty'
import { Product } from '../types'
import Link from 'next/link'
import { formatDisplayPrice } from '../utils'
import { api } from '../api'
import { useState } from 'react'
import { ProductModal } from '../components'

export const Home = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery('productList', async () => {
    const { data } = await api.get('/product')
    return data
  })

  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddModalClose = () => setShowAddModal(false)
  const handleAddModalShow = () => setShowAddModal(true)

  return (
    <MainLayout>
      <Container>
        {isError && !data && (
          <Alert className="mt-4" variant="danger">
            Oops! Something went wrong.
          </Alert>
        )}

        <Container className="mt-4 px-0 d-flex justify-content-between align-items-center">
          <Heading>Products</Heading>
          <Button onClick={handleAddModalShow} data-testid="addProductButton">
            Add Product
          </Button>
        </Container>

        <Container className="px-0 mt-4 mb-5">
          {isLoading && !data && (
            <Container className="px-0 py-4 d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Container>
          )}

          {!isLoading && isEmpty(data) && (
            <div className="my-4 d-flex justify-content-center align-items-center">
              No Product Listings
            </div>
          )}

          {/* TODO: Implement responsive grid with fixed height */}
          {Boolean(data) && (
            <CardColumns>
              {data.map((product: Product) => {
                return (
                  <Card key={product.id} data-testid="productListItem">
                    {product.image ? (
                      <Card.Img variant="top" src={product.image} />
                    ) : (
                      <ProductEmptyImage />
                    )}
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>{`Quantity: ${product.quantity}`}</Card.Text>
                      <Container className="px-0 d-flex justify-content-between">
                        <Card.Text>{`Price: ${formatDisplayPrice(
                          product.price,
                          true
                        )}`}</Card.Text>
                        <Card.Text>{`Status: ${product.status}`}</Card.Text>
                      </Container>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-end">
                      <Link href={`/product/${product.id}`}>
                        <a>View Details</a>
                      </Link>
                    </Card.Footer>
                  </Card>
                )
              })}
            </CardColumns>
          )}
        </Container>
      </Container>

      <ProductModal show={showAddModal} onClose={handleAddModalClose} />
    </MainLayout>
  )
}

export default Home

const Heading = styled.h1`
  font-size: 18px;
`
