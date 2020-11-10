import { Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { AddProductForm } from './AddProductForm'
import { useAddProduct } from '../hooks'

export const AddProductModal = ({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) => {
  const formRef = useRef()

  const [addProduct, { isLoading, isError }] = useAddProduct({
    onSuccess: onClose,
  })

  const handleSubmit = (formData) => {
    addProduct(formData)
    onClose()
  }

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddProductForm
          ref={formRef}
          onSubmit={handleSubmit}
          isError={isError}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          form="addProductForm"
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
