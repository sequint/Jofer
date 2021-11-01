import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './Negotiator.css'

// Check kind of user.
// If 

const Negotiator = ({ showState, setParentState, job }) => {
  const [show, setShow] = useState(showState.state)

  const [ negotiation, setNegotiation ] = useState({
    offer: 0,
    counter: 0,
    finalSalary: 0,
    acceptedOffer: false,
    declinedCounter: false
  })

  const [missingInput, setMissingInput] = useState({
    offer: false,
    counter: false
  })

  // Functions to handle value change of offer and counter.
  const onOfferChange = ({ target: { value } }) => {
    setNegotiation({ ...negotiation, offer: value})
  }
  const onCounterChange = ({ target: { value } }) => {
    setNegotiation({ ...negotiation, offer: value })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Salary Negotiator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Offer:</h5>
          <p>Please enter an initial offer below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Enter Decline Reason'
                aria-label='Decline reason'
                aria-describedby='basic-addon2'
                value={negotiation.offer}
                onChange={onOfferChange}
              />
            </div>
          </InputGroup>
          {missingInput.offer ? <p className="err mt-2">⚠️ Please enter at least one declined reason</p> : <></>}

          <h5>Counter:</h5>
          <p>If you would like to counter the offer, do so below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Enter Decline Reason'
                aria-label='Decline reason'
                aria-describedby='basic-addon2'
                value={negotiation.counter}
                onChange={onCounterChange}
              />
            </div>

            {missingInput.counter ? <p className="err mt-2">⚠️ Please enter at least one declined reason</p> : <></>}
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Negotiator
