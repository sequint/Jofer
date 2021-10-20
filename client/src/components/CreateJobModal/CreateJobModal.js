import { useState,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI/index.js'
import Row from 'react-bootstrap/esm/Row'
// import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import './CreateJobModal.css'

const CreateJob = ({ setParentState }) => {
  const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [userState, setUserState] = useState({
    name: '',
    applicantName: '',
    company: '',
    type: '',
    status: 'Review',
    email: '',
    declineReason: '',
    applicants: []
  })

  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => setUserState({ ...userState, company: data.company }))
  }, [])


  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  const handleRegisterUser = event => {
    if (event) {
      event.preventDefault()
    }
    setShow(false)
    let { name, company, type } = userState
    if (name !== '' && company !== '' && type !== '') {

      JobAPI.create(userState)
        .then(() => {
          alert('Job listing Created')
          setUserState({
            ...userState,
            name: '',
            type: '',
            email: '',
            applicants: []
          })
          UserAPI.getUser()
            .then(({ data }) => setParentState(data))
        })
        .catch(err => console.error(err))
    }
  }
  const handleAddEmail = event => {
    event.preventDefault()
    console.log("clicked")
    console.log(userState.email)
    const applicant = {
      email: userState.email,
      applicantName: userState.applicantName,
      status: 'Review',
      declineReason: userState.declineReason
    }
    userState.applicants.push(applicant)
    console.log(userState.applicants)
    setUserState({
      ...userState, email: '', applicantName: ''
    })
  }

  return (
    <>
      <div
        className="mt-2 mb-2 post">
        <Button
          className="col-2"
          varient="primary"
          onClick={handleShow}>
          Post Job
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleRegisterUser}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Post A New Job
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
                  value={userState.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='company'>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your company'
                  name='company'
                  value={userState.company}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='type'>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the job catagory'
                  name='type'
                  value={userState.type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='applicantName'>
                <Form.Label>Applicant Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter candidates name'
                  name='applicantName'
                  value={userState.applicantName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter candidates email'
                  name='email'
                  value={userState.email}
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

            {userState ? userState.applicants.map(({ applicantName }) => <li>{applicantName}</li>) : <></>}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            onClick={handleRegisterUser}
          >
            Post Job
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default CreateJob