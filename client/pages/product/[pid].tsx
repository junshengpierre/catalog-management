import {
  Button,
  Container,
  Alert,
  Spinner,
  Image,
  Col,
  Row,
  Table,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import {
  MainLayout,
  DeleteProductModal,
  ProductModal,
  ProductEmptyImage,
} from '../../components'
import { formatDisplayPrice } from '../../utils'
import { format } from 'date-fns'
import { useState } from 'react'
import { useGetProduct, useDeleteProduct } from '../../hooks'

// TODO: Fix server-side loaded page does not
// receive query params
const ProductDetail = () => {
  const router = useRouter()
  const { pid } = router.query

  const { data: product, isLoading, isError: isFetchError } = useGetProduct(
    pid as string
  )

  const [
    deleteProduct,
    { isError: isDeleteError, isLoading: isDeleting },
  ] = useDeleteProduct(pid)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = () => setShowDeleteModal(true)

  const [showEditModal, setShowEditModal] = useState(false)

  const handleEditModalClose = () => setShowEditModal(false)
  const handleEditModalShow = () => setShowEditModal(true)

  const formData = product
    ? {
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: formatDisplayPrice(product.price),
        status: product.status,
        file: null,
      }
    : undefined

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
                  {product.image ? (
                    <Image src={product.image} fluid />
                  ) : (
                    <ProductEmptyImage />
                  )}
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
                      <td>{formatDisplayPrice(product.price, true)}</td>
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
                  <Button
                    variant="info"
                    size="lg"
                    className="mr-2"
                    onClick={handleEditModalShow}
                  >
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

      <ProductModal
        show={showEditModal}
        onClose={handleEditModalClose}
        formValues={formData}
        pid={pid as string}
      />

      <DeleteProductModal
        show={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={deleteProduct}
        isDeleting={isDeleting}
      />
    </MainLayout>
  )
}

export default ProductDetail
