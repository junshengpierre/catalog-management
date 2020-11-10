import { Button, Modal } from 'react-bootstrap'

export const DeleteProductModal = ({
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
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete product? It will be permenantly removed.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={isDeleting}
          onClick={isDeleting ? null : onConfirm}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
