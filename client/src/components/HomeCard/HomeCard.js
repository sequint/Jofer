import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'


const HomeCard = ({ job }) => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [declinedReasons, setDeclinedReasons] = useState({
    reasons: [],
    actionItems: []
  })
  const listReasons = _ => declinedReasons.reasons.map(reason => <li>{reason}</li>)
  const listActionItems = _ => declinedReasons.actionItems.map(item => <li>{item}</li>)


  useEffect(() => {

    if (job._id) {
      job.applicants.forEach(applicant => {

        declinedReasons.reasons.push(...applicant.declined.reasons)
        declinedReasons.reasons = Array.from(new Set(declinedReasons.reasons))
        declinedReasons.actionItems.push(...applicant.declined.actionItems)
        declinedReasons.actionItems = Array.from(new Set(declinedReasons.actionItems)) 
      })
    }
  }, [job])

  


  return (
    <>
      <Card className='jobCard aCard'>
        <Card.Header
          className='status header'
          as='h5'><strong>{job.status}</strong>
        </Card.Header>
        <Card.Body
          className="appJob">
          <Card.Title><strong>{job.name}</strong></Card.Title>
          <Card.Text>
            <p><strong>Company:</strong> {job.company}</p>
          </Card.Text>
          <Card.Text>
            <p><strong>Department:</strong> {job.type}</p>
          </Card.Text>
          <div className="bttn">
            <Button
              variant='outline-secondary'
              onClick={handleShow}>
              View Declined Reasons
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
          
          {(declinedReasons.reasons.length > 0 || declinedReasons.actionItems.length > 0) ? <h3>Declined Reasons</h3> : <></>}
          {declinedReasons.reasons.length > 0 ? <p className="mb-1"><strong>Reasons:</strong></p> : <></>}
          {declinedReasons.reasons.length > 0 ? listReasons() : <></>}
          {declinedReasons.reasons.length > 0 ? <p className="mt-3"><strong>Action Items:</strong></p> : <></>}
          {declinedReasons.reasons.length > 0 ? listActionItems() : <></>}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default HomeCard
