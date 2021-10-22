import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'
import './AppliedJobCard.css'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

const AppliedJobCard = ({ job,setParentState }) => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [declinedReasons, setDeclinedReasons] = useState({
    reasons: [],
    actionItems: []
  })

 

  useEffect(() => {
    JobAPI.getAllJobs()
      .then(({ data }) => {
        data.forEach(elem => {
          if (elem._id === job.jobId) {
            console.log('hello')
            UserAPI.getUser()
              .then(({ data }) => {
                console.log(elem)
                console.log(data)
                elem.applicants.forEach(applicant => {
                  if (applicant.email === data.username) {
                    setDeclinedReasons({ reasons: applicant.declined.reasons, actionItems: applicant.declined.actionItems })
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
      
      <div className="cardContainer">
        <Card className="jobCard">
          <Card.Header className='status' as='h5'>{job.status}<ConfirmDeleteModal setParentState={setParentState} job={job} /></Card.Header>
          <Card.Body>
         
            <Card.Title>{job.name}</Card.Title>
            <Card.Text>
              <strong>Company: </strong> {job.company}
            </Card.Text>
            <Card.Text>
              <strong>Department: </strong> {job.type}
            </Card.Text>
            <Button
              variant='outline-secondary'
              onClick={handleShow}>
              View More
            </Button>
          </Card.Body>
        </Card>
      </div>
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
          <p><strong>Department:</strong> {job.type}</p>
          {declinedReasons.reasons ? <p><strong>Reasons:</strong></p> : <></>}
          {declinedReasons.reasons ? listReasons() : <></>}
          {declinedReasons.reasons ? <p><strong>Action Items:</strong></p> : <></>}
          {declinedReasons.reasons ? listActionItems() : <></>}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AppliedJobCard
