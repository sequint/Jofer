import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'
import emailjs from 'emailjs-com'
import './AddApplicant.css'

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

  const [user, setUser] = useState()
  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => {
        setUser(data)
      })
    // .catch(err => window.location = '/auth')
  }, [])

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

    // Change the state of missing input dynamically on input change.
    if (name === 'applicantName') {
      setMissingInput({ ...missingInput, missingApplicantName: false })
    }
    else if (name === 'email') {
      setMissingInput({ ...missingInput, missingEmail: false })
      setCorrectFormat(true)
    }

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

      jobState.applicants.forEach(applicant => {
        if (applicant.email) {
          applicant = {
            ...applicant,
            declined: {
              reasons: [],
              actionItems: []
            },
            offered: {
              offer: [],
              applicantCounter: [],
              employerCounter: [],
              finalSalary: [],
              applicantCountered: [],
              employerCountered: [],
              applicantAcceptedOffer: [],
              employerAcceptedOffer: [],
              applicantDeclinedCounter: [],
              employerDeclinedCounter: [],
              email: applicant.email,
            }
          }
          let email = applicant.email
          let name = applicant.applicantName

          let connectInfo = {
            applicantEmail: email,
            applicantName: name,
            company: user.company
          }
          emailjs.send("service_bzw9z2j", "contact_form", connectInfo, "user_74lDawTBgW65Sfcmf8XdP")

          job.applicants.push(applicant)
        }


      })

      setJobState({ ...jobState, applicants: [] })
      JobAPI.update(job._id, job)
        .then(({ data }) => {
          setParentState(job)
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })

    }
    else {
      setMissingInput({ missingApplicants: true })
    }

  }

  return (
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="createBtn"
          onClick={handleShow}>
          + Applicants
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
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
                  className="gray"
                  type='text'
                  placeholder='Enter candidates name'
                  name='applicantName'
                  value={jobState.applicantName}
                  onChange={handleInputChange}
                />
                {missingInput.missingApplicantName ? <p className="err mt-2">⚠️ Please enter a name</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter candidates email'
                  name='email'
                  value={jobState.email}
                  onChange={handleInputChange}
                />
                {(missingInput.missingEmail || !correctFormat) ? <p className="err mt-2">⚠️ Please enter a valid email address</p> : <></>}
                <Button
                  className="mt-3 createBtn"
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
          {missingInput.missingApplicants ? <p className="err me-4">⚠️ No applicants added yet</p> : <></>}
          <Button
            className="createBtn"
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
