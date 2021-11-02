import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import JobAPI from '../../utils/JobAPI'
import './Negotiator.css'
import { ModalBody } from 'react-bootstrap'

const Negotiator = ({ showState, setParentState, job }) => {
  const [show, setShow] = useState(showState.show)

  const [ negotiation, setNegotiation ] = useState({
    tempOffer: 0,
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
    setNegotiation({ ...negotiation, tempOffer: value})
  }
  const onCounterChange = ({ target: { value } }) => {
    setNegotiation({ ...negotiation, offer: value })
  }

  // Create an on close function to handle close and to handle actions.
  const handleClose = action => {

    setMissingInput({
      offer: false,
      counter: false
    })

    // Save information based on action type based, then close modal.
    switch (action) {

      case 'offer':
        
        if (negotiation.tempOffer > 0) {

          // Close modal by setting show states to false.
          setShow(false)
          setParentState(false)

          // Set offer to equal temp offer.
          negotiation.offer = negotiation.tempOffer
          setNegotiation({ ...negotiation })

          // Set job applicant negotiation data.
          JobAPI.getEmployerJobs()
            .then(({ data }) => {
              data.forEach(elem => {
                if (elem._id === job._id) {
                  elem.applicants.forEach((applicant, index) => {
                    if (applicant.email === showState.applicant.draggableId) {
                      job.applicants[index].status = "Offered"
                      job.applicants[index].offered.offer[0] = negotiation.offer
                      JobAPI.update(job._id, job)
                        .then(({ data }) => console.log(data))
                        .catch(err => console.log(err))
                    }
                  })
                }
              })
            })
            .catch(err => console.log(err))
          
          // Reset temp offer value.
          setNegotiation({ ...negotiation, tempOffer: 0 })

        }
        else {
          // Set missing offer input to true.
          setMissingInput({ ...missingInput, offer: true })
        }

        break
      
      case 'counter':

        if (negotiation.counter > 0) {

          // Close modal by setting show states to false.
          setShow(false)
          setParentState(false)

          // Set job applicant negotiation data.
          JobAPI.getEmployerJobs()
            .then(({ data }) => {
              data.forEach(elem => {
                if (elem._id === job._id) {
                  elem.applicants.forEach((applicant, index) => {
                    if (applicant.email === showState.applicant.draggableId) {
                      job.applicants[index].status = "Offered"
                      job.applicants[index].offered.counter = negotiation.counter
                      JobAPI.update(job._id, job)
                        .then(({ data }) => console.log(data))
                        .catch(err => console.log(err))
                    }
                  })
                }
              })
            })
            .catch(err => console.log(err))

        }
        else {
          // Set missing offer input to true.
          setMissingInput({ ...missingInput, counter: true })
        }

        break

      default:
        setShow(false)
        setParentState(false, false)
        break
    }
  }

  // Functions for modal display depending on the negotiation state.
  const getInitialOffer = _ => {
    return(
      <>
        <ModalBody>
          <h5>Offer:</h5>
          <p>Please enter an initial offer below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Enter Decline Reason'
                aria-label='Decline reason'
                aria-describedby='basic-addon2'
                value={negotiation.tempOffer}
                onChange={onOfferChange}
              />
            </div>
          </InputGroup>
          { missingInput.offer ? <p className="err mt-2">⚠️ You have not entered an offer.</p> : <></> }
        </ModalBody>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleClose('offer')}>
            SendOffer
          </Button>
        </Modal.Footer>
      </>
    )
  }

  const getCounterOffer = _ => {
    return(
      <>
        <ModalBody>
          <h5>Origional Offer:</h5>
          <p>{negotiation.offer}</p>
          <h5>Counter:</h5>
          <p>If you would like to counter, do so below.</p>
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

            {missingInput.counter ? <p className="err mt-2">⚠️ You have not entered a counter offer.</p> : <></>}
          </InputGroup>
        </ModalBody>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleClose('counter')}>
            Send Counter
          </Button>
        </Modal.Footer>
      </>
    )
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>Salary Negotiator</Modal.Title>
        </Modal.Header>

        {negotiation.offer === 0 ? getInitialOffer() : <></>}
        {negotiation.offer > 0 ? getCounterOffer() : <></>}

      </Modal>
    </>
  )
}

export default Negotiator
