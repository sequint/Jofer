import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import JobAPI from '../../utils/JobAPI'
import './DeclineModal.css'

const DeclineModal = ({ showState, setParentState, job }) => {
  const [show, setShow] = useState(showState.state)
  const [declineReasons, setDeclineReasons] = useState({
    reasons: [],
    actionItems: []
  })
  const [reasonInput, setReasonInput] = useState()
  const [actionInput, setActionInput] = useState()
  const [missingInput, setMissingInput] = useState({
    reasons: false,
    actionItems: false
  })

  const handleClose = (action) => {
    switch (action) {
      case 'revert':

        setShow(false)
        setParentState(false, showState.applicant)
        console.log('revert clicked')

        break

      case 'declined':

        if (declineReasons.reasons.length > 0 && declineReasons.actionItems.length > 0) {
          setShow(false)
          setParentState(false, false)
          JobAPI.getEmployerJobs()
            .then(({ data }) => {
              data.forEach(elem => {
                if (elem._id === job._id) {
                  elem.applicants.forEach((applicant, index) => {
                    if (applicant.email === showState.applicant.draggableId) {
                      job.applicants[index].status = "Declined"
                      job.applicants[index].declined.reasons = declineReasons.reasons
                      job.applicants[index].declined.actionItems = declineReasons.actionItems
                      JobAPI.update(job._id, job)
                        .then(({ data }) => console.log(data))
                        .catch(err => console.log(err))
                    }
                  })
                }
              })
            })
        }
        else {
          if (declineReasons.reasons.length < 1 && declineReasons.actionItems.length < 1) {
            setMissingInput({ reasons: true, actionItems: true })
          }
          else {
            if (declineReasons.reasons.length < 1) {
              setMissingInput({ ...missingInput, reasons: true })
            }
            else {
              console.log('in missing action items conditional')
              setMissingInput({ ...missingInput, actionItems: true })
            }
          }
        }

        break

      default:
        setShow(false)
        setParentState(false, false)
        break
    }
  }

  const onReasonChange = ({ target: { value } }) => {
    setReasonInput(value)
  }

  const handleReasonAddClick = event => {
    const tempReasons = declineReasons.reasons.slice()
    tempReasons.push(reasonInput)
    setDeclineReasons({ ...declineReasons, reasons: tempReasons })
    setReasonInput('')
    setMissingInput({ ...missingInput, reasons: false })
  }

  const onActionChange = ({ target: { value } }) => {
    setActionInput(value)
  }

  const handleActionAddClick = event => {
    const tempActionItems = declineReasons.actionItems.slice()
    tempActionItems.push(actionInput)
    setDeclineReasons({ ...declineReasons, actionItems: tempActionItems })
    setActionInput('')
    setMissingInput({ ...missingInput, actionItems: false })
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
        <Modal.Header>
          <Modal.Title>Decline Rational</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Decline Reasons:</h5>
          <p>Please add at least one decline reason below.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Enter Decline Reason'
                aria-label='Decline reason'
                aria-describedby='basic-addon2'
                value={reasonInput}
                onChange={onReasonChange}
              />
            </div>
            <svg
              className='addReason ms-4 mb-2'
              onClick={handleReasonAddClick}
              fill='none' viewBox='0 0 24 24'
              height='30px'
              width='30px'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z'
                clipRule='evenodd'
              />
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z'
                clipRule='evenodd'
              />
            </svg>

            {missingInput.reasons ? <p className="err mt-2">⚠️ Please enter at least one declined reason</p> : <></>}
          </InputGroup>
          {declineReasons.reasons ? declineReasons.reasons.map(reason => <li>{reason}</li>) : <></>}
          <hr />
          <h5 className="mt-3">Action Items</h5>
          <p>Please list at least one action item for the applicant to work on.</p>
          <InputGroup className='mb-3 decline'>
            <div>
              <FormControl
                className="col-5 mb-2 me-5"
                placeholder='Enter Action Item'
                aria-label='Action item'
                aria-describedby='basic-addon2'
                value={actionInput}
                onChange={onActionChange}
              />
            </div>
            <svg
              className='addReason ms-4 mb-2'
              onClick={handleActionAddClick}
              fill='none'
              viewBox='0 0 24 24'
              height='30px'
              width='30px'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z'
                clipRule='evenodd'
              />
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z'
                clipRule='evenodd'
              />
            </svg>
            {missingInput.actionItems ? <p className="err mt-2">⚠️ Please enter at least one action item</p> : <></>}
          </InputGroup>
          {declineReasons.actionItems ? declineReasons.actionItems.map(item => <li>{item}</li>) : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="revert"
            onClick={() => handleClose('revert')}>
            Revert Decline Status
          </Button>
          <Button
            className="declinedCard"
            onClick={() => handleClose('declined')}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeclineModal
