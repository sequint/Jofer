import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import JobAPI from '../../utils/JobAPI'
import './Negotiator.css'
import { ModalBody } from 'react-bootstrap'

const Negotiator = ({ showState, setParentState, job, passedNegotiation }) => {
  const [show, setShow] = useState(showState.show)
  console.log(job)
  console.log(passedNegotiation)

  const [negotiation, setNegotiation] = useState({
    tempOffer: 0,
    tempCounter: 0,
    offer: [],
    applicantCounter: [],
    employerCounter: [],
    finalSalary: [],
    applicantCountered: [false],
    employerCountered: [false],
    applicantAcceptedOffer: [false],
    employerAcceptedOffer: [false],
    applicantDeclinedCounter: [false],
    employerDeclinedCounter: [false]
  })

  const [missingInput, setMissingInput] = useState({
    offer: false,
    counter: false
  })

  // Reset negotiation state if one was passed in.
  useEffect(() => {
    if (passedNegotiation) {
      setNegotiation({
        offer: passedNegotiation.offer,
        applicantCounter: passedNegotiation.applicantCounter,
        employerCounter: passedNegotiation.employerCounter,
        finalSalary: passedNegotiation.finalSalary,
        applicantCountered: passedNegotiation.applicantCountered,
        employerCountered: passedNegotiation.employerCountered,
        applicantAcceptedOffer: passedNegotiation.applicantAcceptedOffer,
        employerAcceptedOffer: passedNegotiation.employerAcceptedOffer,
        applicantDeclinedCounter: passedNegotiation.applicantDeclinedCounter,
        employerDeclinedCounter: passedNegotiation.employerDeclinedCounter
      })
    }
  }, [])

  // Functions to handle value change of offer and counter.
  const onOfferChange = ({ target: { value } }) => {
    setNegotiation({ ...negotiation, tempOffer: value })
  }
  const onCounterChange = ({ target: { value } }) => {
    setNegotiation({ ...negotiation, tempCounter: value })
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

          // Set offer to equal temp offer.
          negotiation.offer = [negotiation.tempOffer]
          setNegotiation({ ...negotiation })

          // Set job applicant negotiation data.
          JobAPI.getEmployerJobs()
            .then(({ data }) => {
              data.forEach(elem => {
                if (elem._id === job._id) {
                  elem.applicants.forEach((applicant, index) => {
                    if (applicant.email === showState.applicant.draggableId) {
                      // Set status to offered.
                      job.applicants[index].status = "Offered"
                      // Set jobs offer var to the negotiation offer var.
                      job.applicants[index].offered.offer = negotiation.offer
                      // Send modal close and updated job back to parent component.
                      setParentState(false, job)
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

        if (negotiation.tempCounter > 0) {

          // Close modal by setting show states to false.
          setShow(false)
          console.log(job)

          if (job.jobId) {
            console.log('applicant')

            // Set applicant offer to equal temp offer.
            negotiation.applicantCounter = [negotiation.tempCounter]
            setNegotiation({ ...negotiation })

            // Set job applicant negotiation data.
            JobAPI.getCandidateJobs()
              .then(({ data }) => {
                console.log(data)
                data.userJobs.forEach(tempJob => {
                  if (tempJob.jobId === job.jobId) {
                    tempJob.applicants.forEach((applicant, index) => {
                      if (applicant.email === job.email) {

                        // Set the jobs applicant counter to input value.
                        tempJob.applicants[index].offered.applicantCounter = negotiation.applicantCounter
                        // Change applicant counter bool to true.
                        tempJob.applicants[index].offered.applicantCountered = [true]
                        // Insure that employer counter is false.
                        tempJob.applicants[index].offered.emplyerCountered = [false]
                        // Send new data back to parent state and close modal.
                        setParentState(false, tempJob)

                      }
                    })
                  }
                })
              })
              .catch(err => console.log(err))
          }
          else if (job._id) {
            console.log('employer')

            // Set employer offer to equal temp offer.
            negotiation.employerCounter = [negotiation.tempCounter]
            setNegotiation({ ...negotiation })

            // Set job applicant negotiation data.
            job.applicants.forEach((applicant, index) => {
              console.log(applicant.email)
              console.log(showState.applicant.draggableId)
              if (applicant.email === showState.applicant.draggableId) {

                // Set the jobs applicant counter to input value.
                job.applicants[index].offered.applicantCounter = negotiation.employerCounter
                // Change applicant counter bool to true.
                job.applicants[index].offered.emplyerCountered = [true]
                // Insure that employer counter is false.
                job.applicants[index].offered.applicantCountered = [false]
                // Send new data back to parent state and close modal.
                setParentState(false, job)

              }
            })
          }
          else {
            console.log('something went wrong')
          }

          

        }
        else {
          // Set missing offer input to true.
          setMissingInput({ ...missingInput, counter: true })
        }

        break

      default:
        setShow(false)
        setParentState(false, job)
        break
    }
  }

  // Functions for modal display depending on the negotiation state.
  const getInitialOffer = _ => {
    return (
      <>
        <ModalBody>
          <h5>Offer:</h5>
          <p>Please enter an initial offer below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Initial Offer'
                aria-label='Initial Offer'
                aria-describedby='basic-addon2'
                value={negotiation.tempOffer}
                onChange={onOfferChange}
              />
            </div>
          </InputGroup>
          {missingInput.offer ? <p className="err mt-2">⚠️ You have not entered an offer</p> : <></>}
        </ModalBody>

        <Modal.Footer>
          <Button
            className="Offer"
            onClick={() => handleClose('offer')}>
            Send Offer
          </Button>
        </Modal.Footer>
      </>
    )
  }

  const displayPriorCounter = _ => {

    // Return either the employer or applicant's counter offer depending on who is viewing.
    if (job.jobId) {
      return (
        <>
          <h5>Employer's Counter Offer:</h5>
          <p>{negotiation.employerCounter}</p>
        </>
      )
    }
    else if (job._id) {
      return (
        <>
          <h5>Applicant's Counter Offer:</h5>
          <p>{negotiation.applicantCounter}</p>
        </>
      )
    }
    else {
      console.log('Something went wrong')
    }

  }

  const getCounterOffer = _ => {
    return (
      <>
        <ModalBody>
          <h5>Initial Offer:</h5>
          <p>{negotiation.offer}</p>
          {negotiation.applicantCountered[0] || negotiation.employerCountered[0] ? displayPriorCounter() : <></>}
          <p>If you would like to counter this off, do so below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Counter Offer'
                aria-label='Counter Offer'
                aria-describedby='basic-addon2'
                value={negotiation.tempCounter}
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

        {negotiation.offer.length === 0 ? getInitialOffer() : <></>}
        {negotiation.offer.length > 0 ? getCounterOffer() : <></>}

      </Modal>
    </>
  )
}

export default Negotiator
