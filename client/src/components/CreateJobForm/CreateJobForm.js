import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI.js'


const CreateJobForm = () => {
  const [userState, setUserState] = useState({
    name: '',
    company: '',
    type: '',
    status: 'Review',
    applicantEmails:[]
    
  })

  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  const handleRegisterUser = event => {
    event.preventDefault()
    JobAPI.create(userState)
      .then(() => {
        alert('Job listing Created')
        setUserState({
          ...userState, name: '',
          company: '',
          type: '',
          status: 'Review',})
      })
      .catch(err => console.error(err))
  }
  return (
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
     
      <Button
        variant='primary'
        type='submit'
        onClick={handleRegisterUser}
      >
        Register
      </Button>
    </Form>
  )
}

export default CreateJobForm
