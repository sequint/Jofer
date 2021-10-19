import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeclineModal = () => {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Decline Rational</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Decline Reasons</h3>
          <p>Please add at least one decline reason below.</p>
          <h3>Action Items</h3>
          <p>Please list a minimum of 3 skill sets the applicant can imporove on to be better prepared for a similar position in the future.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Revert Decline Status
          </Button>
          <Button variant="danger">Decline</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeclineModal
