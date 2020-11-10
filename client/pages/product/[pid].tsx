import {
  Button,
  Container,
  Alert,
  Spinner,
  Image,
  Col,
  Row,
  Table,
  Modal,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import { useQuery, useMutation, useQueryCache } from 'react-query'
import { formatDisplayPrice } from '../../utils/formatDisplayPrice'
import { format } from 'date-fns'
import { useState } from 'react'
import { api } from '../../api'

// TODO: Fix server-side loaded page does not
// receive query params
const ProductDetail = () => {
  const router = useRouter()
  const { pid } = router.query

  const queryCache = useQueryCache()

  const { data: product, isLoading, isError: isFetchError } = useQuery(
    'productList',
    async () => {
      const { data } = await api.get(`/product/${pid}`)
      return data
    }
  )

  const [
    deleteProduct,
    { isError: isDeleteError, isLoading: isDeleting },
  ] = useMutation(
    async () => {
      return await api.delete(`/product/${pid}`)
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries('productList')
        router.push('/')
      },
    }
  )

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = () => setShowDeleteModal(true)

  return (
    <MainLayout>
      <Container>
        {(isFetchError && !product) ||
          (isDeleteError && (
            <Alert className="mt-4" variant="danger">
              Oops! Something went wrong.
            </Alert>
          ))}

        {isLoading && !product && (
          <Container className="px-0 py-4 d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
        )}

        {product && (
          <Container className="mt-4">
            <Row>
              <Col lg={4} md={12} className="">
                <Container className="mb-4 d-flex justify-content-center justify-content-lg-start">
                  <Image src={product.image} fluid />
                </Container>
              </Col>

              <Col lg={8}>
                <Table borderless>
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{product.id}</td>
                    </tr>
                    <tr>
                      <th>Title</th>
                      <td>{product.title}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{product.description}</td>
                    </tr>
                    <tr>
                      <th>Quantity</th>
                      <td>{product.quantity}</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>{formatDisplayPrice(product.price)}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{product.status}</td>
                    </tr>
                    <tr>
                      <th>Date Created</th>
                      <td>
                        {format(new Date(product.createdAt), 'd MMM yyyy')}
                      </td>
                    </tr>
                    <tr>
                      <th>Last Updated</th>
                      <td>
                        {format(new Date(product.updatedAt), 'd MMM yyyy')}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Container className="mt-4 d-flex justify-content-center justify-content-lg-start">
                  <Button variant="info" size="lg" className="mr-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={handleDeleteModalShow}
                  >
                    Delete
                  </Button>
                </Container>
              </Col>
            </Row>
          </Container>
        )}
      </Container>

      <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={deleteProduct}
        isDeleting={isDeleting}
      />
    </MainLayout>
  )
}

export default ProductDetail

const DeleteModal = ({
  show,
  isDeleting,
  onClose,
  onConfirm,
}: {
  show: boolean
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete product?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Product cannot restored when it is deleted.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={isDeleting}
          onClick={isDeleting ? null : onConfirm}
        >
          {isDeleting ? 'Deleting...' : 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
