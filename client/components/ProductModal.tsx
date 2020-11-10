import { Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { ProductForm } from './ProductForm'
import { useAddProduct, useUpdateProduct } from '../hooks'

export const ProductModal = ({
  show,
  onClose,
  formValues,
  pid,
}: {
  show: boolean
  onClose: () => void
  formValues?: any
  pid?: string
}) => {
  const formRef = useRef()

  const [
    addProduct,
    { isLoading: isAdding, isError: isAddError },
  ] = useAddProduct()

  const [
    updateProduct,
    { isLoading: isUpdating, isError: isUpdateError },
  ] = useUpdateProduct({
    pid: pid as string,
  })

  const handleSubmit = (formData) => {
    formValues ? updateProduct(formData) : addProduct(formData)
    onClose()
  }

  const isLoading = formValues ? isUpdating : isAdding

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formValues ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProductForm
          ref={formRef}
          onSubmit={handleSubmit}
          isError={isAddError || isUpdateError}
          formValues={formValues}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            formRef?.current?.submitForm()
          }}
        >
          {isLoading ? 'Submitting' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
