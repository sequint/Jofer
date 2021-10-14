import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserAPI from '../../utils/UserAPI'

const SignInForm = () => {
  const [userState, setUserState] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  
  const handleLoginUser = event => {
    event.preventDefault()
    UserAPI.login(userState)
      .then(({ data: token }) => {
        localStorage.setItem('token', token)
        setUserState({ ...userState, name: '', email: '', username: '', password: '' })
        window.location = '/'
      })
      .catch(err => console.error(err))
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter your username"
          name="username"
          value={userState.username}
          onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Enter your password"
          name="password"
          value={userState.password}
          onChange={handleInputChange} />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit"
        onClick={handleLoginUser} >
        Sign In
      </Button>
    </Form>
  )
}

export default SignInForm
