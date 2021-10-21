import { useState,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI/index.js'
import Row from 'react-bootstrap/esm/Row'
// import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import './CreateJobModal.css'

const CreateJob = ({ setParentState }) => {
  const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [jobState, setJobState] = useState({
    name: '',
    applicantName: '',
    company: '',
    type: '',
    status: 'Review',
    email: '',
    declineReason: '',
    applicants: []
  })

  const [missingInput, setMissingInput] = useState({
    missingName: false,
    missingCompany: false,
    missingType: false
  })

  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => setJobState({ ...jobState, company: data.company }))
  }, [])


  const handleInputChange = ({ target: { name, value } }) => setJobState({ ...jobState, [name]: value })

  const handleCreateJob = event => {

    if (event) {
      event.preventDefault()
    }

    let { name, company, type } = jobState

    setMissingInput({ missingName: false, missingCompany: false, missingType: false })

    if (name !== '' && company !== '' && type !== '') {

      JobAPI.create(jobState)
        .then(() => {
          alert('Job listing Created')
          setJobState({
            ...jobState,
            name: '',
            type: '',
            email: '',
            applicants: []
          })
          UserAPI.getUser()
            .then(({ data }) => setParentState(data))
        })
        .catch(err => console.error(err))

        console.log(event)
        setShow(false)

    }
    else {

      let newJobInput = [ name, company, type ]

      newJobInput.forEach((input, index) => {
        if (input.length === 0) {
          switch (index) {
            case 0:
              missingInput.missingName = true
              setMissingInput({ ...missingInput })
              break
            case 1:
              missingInput.missingCompany = true
              setMissingInput({ ...missingInput })
              break
            case 2:
              missingInput.missingType = true
              setMissingInput({ ...missingInput })
              break
            default:
              break
          }
        }
      })

    }
  }

  const handleAddEmail = event => {
    event.preventDefault()
    console.log("clicked")
    console.log(jobState.email)
    const applicant = {
      email: jobState.email,
      applicantName: jobState.applicantName,
      status: 'Review',
      declineReason: jobState.declineReason
    }
    jobState.applicants.push(applicant)
    console.log(jobState.applicants)
    setJobState({
      ...jobState, email: '', applicantName: ''
    })
  }

  return (
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="col-2 createBtn"
          varient="primary"
          onClick={handleShow}>
          Create New Job
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleCreateJob}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Create A New Job
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Form>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the job title'
                  name='name'
                  value={jobState.name}
                  onChange={handleInputChange}
                />
                {missingInput.missingName ? <p className="err">⚠️ Please enter a job title</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='company'>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your company'
                  name='company'
                  value={jobState.company}
                  onChange={handleInputChange}
                />
                {missingInput.missingCompany ? <p className="err">⚠️ Please enter a company name</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='type'>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the job catagory'
                  name='type'
                  value={jobState.type}
                  onChange={handleInputChange}
                />
                {missingInput.missingType ? <p className="err">⚠️ Please enter a department for the job</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='applicantName'>
                <Form.Label>Applicant Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter candidates name'
                  name='applicantName'
                  value={jobState.applicantName}
                  onChange={handleInputChange}
                />
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
                <Button
                  className="mt-3"
                  variant='primary'
                  type='submit'
                  onClick={handleAddEmail}
                >
                  Add Applicant
                </Button>
              </Form.Group>
            </Form>
          </Row>

          <hr />

          <Row>
            <h3>Applicants</h3>
            {userState ? userState.applicants.map(({ applicantName }) => <Card><Card.Body>{applicantName}</Card.Body></Card>) : <></>}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            onClick={handleCreateJob}
          >
            Create Job
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default CreateJob