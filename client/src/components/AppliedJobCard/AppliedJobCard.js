import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import Negotiator from '../Negotiator/Negotiator'
import './AppliedJobCard.css'
import currencyFormatter from 'currency-formatter'

const AppliedJobCard = ({ job, setParentState }) => {
  const [show, setShow] = useState(false)
  const [declinedReasons, setDeclinedReasons] = useState({
    reasons: [],
    actionItems: []
  })
  const [showNegotiator, setShowNegotiator] = useState({
    show: false
  })
  const [greenBorder, setGreenBorder] = useState(true)
  
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleShowNegotiator = (showState, newJobState, green) => {
    setParentState()
    showNegotiator.show = showState
    setShowNegotiator({ ...showNegotiator })
    setGreenBorder(green)
    console.log(newJobState)
    if (newJobState) {
      localStorage.setItem('clickedManageJob', JSON.stringify(newJobState))
      job = newJobState
      JobAPI.update(job.jobId, job)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err))
    }
    JobAPI.getAllJobs()
      .then(({ data }) => {
        data.forEach(elem => {
          if (elem._id === job.jobId) {
            UserAPI.getUser()
              .then(({ data }) => {
                elem.applicants.forEach(applicant => {
                  if (applicant.email === data.username) {
                    setDeclinedReasons({ reasons: applicant.declined.reasons, actionItems: applicant.declined.actionItems })
                    setNegotiations({
                      offer: applicant.offered.offer,
                      applicantCounter: applicant.offered.applicantCounter,
                      employerCounter: applicant.offered.employerCounter,
                      finalSalary: applicant.offered.finalSalary,
                      applicantCountered: applicant.offered.applicantCountered,
                      employerCountered: applicant.offered.employerCountered,
                      applicantAcceptedOffer: applicant.offered.applicantAcceptedOffer,
                      employerAcceptedOffer: applicant.offered.employerAcceptedOffer,
                      applicantDeclinedCounter: applicant.offered.applicantDeclinedCounter,
                      employerDeclinedCounter: applicant.offered.employerDeclinedCounter
                    })
                  }
                })
              })
          }
        })
      })

  }

  // Set state vaiable for negotiations.
  const [negotiations, setNegotiations] = useState({
    offer: [],
    applicantCounter: [],
    employerCounter: [],
    finalSalary: [],
    applicantCountered: [],
    employerCountered: [],
    applicantAcceptedOffer: [],
    employerAcceptedOffer: [],
    applicantDeclinedCounter: [],
    employerDeclinedCounter: []
  })

  useEffect(() => {
    JobAPI.getAllJobs()
      .then(({ data }) => {
        data.forEach(elem => {
          if (elem._id === job.jobId) {
            UserAPI.getUser()
              .then(({ data }) => {
                elem.applicants.forEach(applicant => {
                  if (applicant.email === data.username) {
                    setDeclinedReasons({ reasons: applicant.declined.reasons, actionItems: applicant.declined.actionItems })
                    setNegotiations({
                      offer: applicant.offered.offer,
                      applicantCounter: applicant.offered.applicantCounter,
                      employerCounter: applicant.offered.employerCounter,
                      finalSalary: applicant.offered.finalSalary,
                      applicantCountered: applicant.offered.applicantCountered,
                      employerCountered: applicant.offered.employerCountered,
                      applicantAcceptedOffer: applicant.offered.applicantAcceptedOffer,
                      employerAcceptedOffer: applicant.offered.employerAcceptedOffer,
                      applicantDeclinedCounter: applicant.offered.applicantDeclinedCounter,
                      employerDeclinedCounter: applicant.offered.employerDeclinedCounter
                    })
                  }
                })
              })
          }
        })
      })
  }, [])

  const listReasons = _ => declinedReasons.reasons.map(reason => <li>{reason}</li>)
  const listActionItems = _ => declinedReasons.actionItems.map(item => <li>{item}</li>)

  return (
    <>
      <Card className='jobCard aCard'>
        <Card.Header
          className='status header'
          as='h5'>{job.status}
          <ConfirmDeleteModal
            setParentState={setParentState}
            job={job} />
        </Card.Header>
        <Card.Body
          className="appJob">
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            <strong>Company: </strong> {job.company}
          </Card.Text>
          <Card.Text>
            <strong>Department: </strong> {job.type}
          </Card.Text>
          <div className="bttn">
            {negotiations.offer.length > 0 ? (negotiations.finalSalary.length > 0 || negotiations.employerAcceptedOffer[0]=== false|| negotiations.applicantAcceptedOffer[0]===false ) ? <></>: <Button
              className={((negotiations.employerCountered[0] === true && greenBorder) || (negotiations.offer.length > 0 && greenBorder && negotiations.employerCountered.length === 0)) ? 'viewOfferGreen' : 'viewOffer'}
              onClick={handleShowNegotiator}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="30px"
                width="30px"
              >
                <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1 1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59l.3-.29M20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7v1m.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6z" />
              </svg>
            </Button>: <></>}
            
            <Button
              className="viewJobBtn"
              onClick={handleShow}>
              View More
            </Button>
          </div>
        </Card.Body>
      </Card>
      {showNegotiator.show ? (
        <Negotiator
          showState={showNegotiator}
          setParentState={handleShowNegotiator}
          job={job}
          passedNegotiation={negotiations}
        />) : <></>}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {job.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Department:</strong> {job.type}</p>
          <hr />
          {(declinedReasons.reasons.length > 0 || declinedReasons.actionItems.length > 0) ?<h3>Declined Reason</h3> : <></>}
          {declinedReasons.reasons.length > 0 ? <p className="mb-1"><strong>Reasons:</strong></p> : <></>}
          {declinedReasons.reasons.length > 0 ? listReasons() : <></>}
          {declinedReasons.reasons.length > 0 ? <p className="mt-3"><strong>Action Items:</strong></p> : <></>}
          {declinedReasons.reasons.length > 0 ? listActionItems() : <></>}
          {negotiations.employerDeclinedCounter[0] === false || negotiations.applicantAcceptedOffer[0] === false ||negotiations.employerAcceptedOffer[0] ===false ? <p className="mt-3"><strong>Offer was declined</strong></p> : negotiations.offer.length > 0 ? negotiations.finalSalary[0] > 0 ? <p className="mt-3"><strong>Final Offer: </strong>{currencyFormatter.format(negotiations.finalSalary[0], { locale: 'en-Us' })}</p> : <p className="mt-3"><strong>Initial Offer:  </strong>{currencyFormatter.format(negotiations.offer[0], { locale: 'en-Us' } )}</p> : <></>    }
         
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AppliedJobCard
