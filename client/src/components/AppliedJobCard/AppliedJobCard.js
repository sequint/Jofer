import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import './AppliedJobCard.css'

const AppliedJobCard = ({ job, setParentState }) => {
  console.log(job.id)
  console.log(job.applicants)
  console.log(job);

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [declinedReasons, setDeclinedReasons] = useState({
    reasons: [],
    actionItems: []
  })

  console.log(declinedReasons)

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
      <Card className='jobCard'>
        <Card.Header
          className='status'
          as='h5'>{job.status}
          <ConfirmDeleteModal
            setParentState={setParentState}
            job={job} />
        </Card.Header>
        <Card.Body
          className="appJob">
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            Company: {job.company}
          </Card.Text>
          <Card.Text>
            Department: {job.type}
          </Card.Text>
          <div className="bttn">
            <Button
              variant='outline-secondary'
              onClick={handleShow}>
              View More
            </Button>
          </div>
        </Card.Body>
      </Card>
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
          <h3>Declined Reason</h3>
          {declinedReasons.reasons ? <p className="mb-1"><strong>Reasons:</strong></p> : <></>}
          {declinedReasons.reasons ? listReasons() : <></>}
          {declinedReasons.reasons ? <p className="mt-3"><strong>Action Items:</strong></p> : <></>}
          {declinedReasons.reasons ? listActionItems() : <></>}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AppliedJobCard
