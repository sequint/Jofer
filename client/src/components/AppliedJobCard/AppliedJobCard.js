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
            {negotiations.offer.length > 0 ? (negotiations.finalSalary.length >0 || negotiations.employerDeclinedCounter[0]===false|| negotiations.applicantAcceptedOffer[0]===false ) ? <></>: <Button
              className={((negotiations.employerCountered[0] === true && greenBorder) || (negotiations.offer.length > 0 && greenBorder && negotiations.employerCountered.length === 0)) ? 'viewJobBtnGreen' : 'viewJobBtn'}
              onClick={handleShowNegotiator}
            >
              See Offer
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
          {negotiations.employerDeclinedCounter[0] === false || negotiations.applicantAcceptedOffer[0] === false ? <p className="mt-3"><strong>Offer was declined</strong></p> : negotiations.offer.length > 0 ? negotiations.finalSalary[0] > 0 ? <p className="mt-3"><strong>Final Offer: </strong>{currencyFormatter.format(negotiations.finalSalary[0], { locale: 'en-Us' })}</p> : <p className="mt-3"><strong>Initial Offer:  </strong>{currencyFormatter.format(negotiations.offer[0], { locale: 'en-Us' } )}</p> : <></>    }
         
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AppliedJobCard
