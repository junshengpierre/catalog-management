import {
  Button,
  Container,
  Card,
  Alert,
  CardColumns,
  Spinner,
  Modal,
} from 'react-bootstrap'
import { MainLayout } from '../components/MainLayout'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import isEmpty from 'lodash/isEmpty'
import { Product } from '../types'
import Link from 'next/link'
import { formatDisplayPrice } from '../utils/formatDisplayPrice'
import { api } from '../api'
import { useState, useRef } from 'react'
import { AddProductForm } from '../components/AddProductForm'

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

          {/* TODO: Fix broken grid display when number of items % 3 is 1 */}
          {Boolean(data) && (
            <CardColumns>
              {data.map((product: Product) => {
                return (
                  <Card key={product.id} data-testid="productListItem">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>{`Quantity: ${product.quantity}`}</Card.Text>
                      <Container className="px-0 d-flex justify-content-between">
                        <Card.Text>{`Price: ${formatDisplayPrice(
                          product.price
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
      <AddModal show={showAddModal} onClose={handleAddModalClose} />
    </MainLayout>
  )
}

export default Home

const Heading = styled.h1`
  font-size: 18px;
`

// lastName: Yup.string().required(),
// username: Yup.string().required(),
// city: Yup.string().required(),
// state: Yup.string().required(),
// zip: Yup.string().required(),
// terms: Yup.bool().required(),

const AddModal = ({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) => {
  const formRef = useRef()

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddProductForm ref={formRef} onSuccess={onClose} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          form="addProductForm"
          variant="primary"
          type="submit"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            formRef?.current?.submitForm()
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
