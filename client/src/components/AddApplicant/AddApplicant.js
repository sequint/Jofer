import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'

const AddApplicant = ({ job, setParentState }) => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  
  const [jobState, setJobState] = useState({
    email: '',
    applicantName: '',
    applicants: []
  })

  const [missingInput, setMissingInput] = useState({
    missingApplicants: false,
    missingApplicantName: false,
    missingEmail: false
  })

  const [correctFormat, setCorrectFormat] = useState(true)

  const handleClose = () => {
    setMissingInput({
      missingApplicants: false,
      missingApplicantName: false,
      missingEmail: false
    })
    setJobState({
      email: '',
      applicantName: '',
      applicants: []
    })
    setCorrectFormat(true)
    setShow(false)
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setMissingInput({ ...missingInput, missingApplicants: false })
    setJobState({ ...jobState, [name]: value })
  } 

  const handleAddApplicant = event => {
    if (event) {
      event.preventDefault()
    }

    setCorrectFormat(true)
    setMissingInput({ ...missingInput, missingApplicantName: false, missingEmail: false })

    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailFormat.test(jobState.email) && jobState.email !== '' && jobState.applicantName !== '') {
      const applicant = {
        email: jobState.email,
        applicantName: jobState.applicantName,
        status: 'Review'
      }

      jobState.applicants.push(applicant)

      setJobState({
        ...jobState, email: '', applicantName: ''
      })
    }
    else {

      if (!(emailFormat.test(jobState.email))) {
        setCorrectFormat(false)
      }

      if (jobState.email === '') {
        setMissingInput({ ...missingInput, missingEmail: true })
      }

      if (jobState.applicantName === '') {
        setMissingInput({ ...missingInput, missingApplicantName: true })
      }
    }
  }

  const handleAddAllApplicants = event => {

    if (event) {
      event.preventDefault()
    }

    

    setMissingInput({ missingApplicants: false })

    if (jobState.applicants.length > 0) {
      console.log(jobState.applicants)
      console.log(job.applicants)

      job.applicants.push(jobState.applicants)
      console.log(job)
      console.log(jobState.applicants)
      jobState.applicants.forEach(applicant=>{
        applicant= {
          ...applicant,
          declined:{
            reasons:[],
            actionItems:[]
        } }
        job.applicants.push(applicant)

      })
      
      setJobState({...jobState, applicants:[]})
      JobAPI.update(job._id, job)
        .then(({data}) => {
          console.log("hello")

          setParentState(job)
          handleClose()
        })
        .catch(err=>{
          console.log(err)
        })

    }
    else {
      setMissingInput({ missingApplicants: true })
    }

  }

  return(
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="col-2 createBtn"
          varient="primary"
          onClick={handleShow}>
          + Applicants
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Additional Applicants
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Form>
              <Form.Group className='mb-3' controlId='applicantName'>
                <Form.Label>Applicant Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter candidates name'
                  name='applicantName'
                  value={jobState.applicantName}
                  onChange={handleInputChange}
                />
                {missingInput.missingApplicantName ? <p className="err">⚠️ Please enter a name</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter candidates email'
                  name='email'
                  value={jobState.email}
                  onChange={handleInputChange}
                />
                {(missingInput.missingEmail || !correctFormat) ? <p className="err">⚠️ Please enter a valid email address</p> : <></>}
                <Button
                  className="mt-3"
                  variant='primary'
                  type='submit'
                  onClick={handleAddApplicant}
                >
                  Add Applicant
                </Button>
              </Form.Group>
            </Form>
          </Row>

          <hr />

          <Row>
            <h3>Applicants</h3>
            {jobState ? jobState.applicants.map(({ applicantName }) => <li>{applicantName}</li>) : <></>}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {missingInput.missingApplicants ? <p className="err">⚠️ No applicants added yet</p> : <></>}
          <Button
            variant='primary'
            type='submit'
            onClick={handleAddAllApplicants}
          >
            Add New Applicants
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddApplicant
