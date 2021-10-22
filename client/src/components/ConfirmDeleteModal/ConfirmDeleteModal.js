import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'

const ConfirmDeleteModal = ({job}) => {
  
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleConfirmDelete = () => {
    JobAPI.delete(job._id)
      .then(() => {
        console.log('deleted')
        setShow(false)
        
      })
  }
  const handleClose = () => {
    setShow(false)
  }

  return(
    <>
    <button onClick={handleShow} className="btn-close"></button>
    <Modal
    show={show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Are you sure you want to delete this job?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
   <p>⚠️ Once you delete this job you will no longer be able to acess the listing.</p>
      <Button variant="primary" type="submit" onClick={handleConfirmDelete}>
        Confirm
      </Button>
      <Button variant="primary" type="submit" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
  
}

export default ConfirmDeleteModal