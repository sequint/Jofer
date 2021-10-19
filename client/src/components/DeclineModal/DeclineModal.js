import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './DeclineModal.css'

const DeclineModal = ({ showState }) => {
  const [ show, setShow ] = useState(showState.state)
  const [ delineReasons, setDeclineReasons ] = useState({
    reason:[],
    actionItems:[]
  })

  console.log('hello')
  console.log(show)

  const handleClose = () => setShow(false)

  const handleReasonAddClick = _ => {
    console.log('here')
  }

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
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <svg className="addReason" onClick={handleReasonAddClick} fill="none" viewBox="0 0 24 24" height="40px" width="40px">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
                clipRule="evenodd"
              />
            </svg>
          </InputGroup>
          <h3>Action Items</h3>
          <p>Please list a minimum of 3 skill sets the applicant can imporove on to be better prepared for a similar position in the future.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Revert Decline Status
          </Button>
          <Button variant="danger" onClick={handleClose}>Decline</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeclineModal
