import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import JobAPI from '../../utils/JobAPI/index.js'


const CreateJobForm = () => {
  const [userState, setUserState] = useState({
    name: '',
    applicantName:'',
    company: '',
    type: '',
    status: 'Review',
    email: '',
    declineReason: '',
    applicants: []

  })

  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  const handleRegisterUser = event => {
    event.preventDefault()
    JobAPI.create(userState)
      .then(() => {
        alert('Job listing Created')
        setUserState({
          ...userState, 
          name: '',
          company: '',
          type: '',
          email:'',
          applicants:[]
        })
      })
      .catch(err => console.error(err))
  }
  const handleAddEmail = event => {
    event.preventDefault()
    console.log("clicked")
    console.log(userState.email)
    const applicant = {
      email:userState.email,
      applicantName:userState.applicantName,
      status: 'Review',
      declineReason: userState.declineReason
    }
    userState.applicants.push(applicant)
    console.log(userState.applicants)
    setUserState({
      ...userState, email:'', applicantName:''
    })
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
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
                  variant='primary'
                  type='submit'
                  onClick={handleAddEmail}
                >
                  +
                </Button>
              </Form.Group>

              <Button
                variant='primary'
                type='submit'
                onClick={handleRegisterUser}
              >
                Register
              </Button>
            </Form>
          </Col>
          <Col>
            <h3>Applicants</h3>

            {userState ? userState.applicants.map(({applicantName}) => <li>{applicantName}</li>) : <></>}

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateJobForm
