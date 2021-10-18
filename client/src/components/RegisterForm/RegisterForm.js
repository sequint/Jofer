import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserAPI from '../../utils/UserAPI'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'

const RegisterForm = () => {
  const [userState, setUserState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '',
    company: ''
  })

  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  const handleRegisterUser = event => {
    event.preventDefault()
    console.log(userState)
    UserAPI.register(userState)
      .then(({ data: token }) => {
        alert('User Registered!')
        localStorage.setItem('token', token)
        setUserState({ ...userState, first_name: '', last_name: '', email: '', password: '' })
        window.location = '/login'
      })
      .catch(err => console.error(err))
  }

  const handleLogin = () => {
    window.location = '/login'
  }

  const handleHome = () => {
    window.location = '/'
  }

  return (
    <Form
      className="form">

      <FloatingLabel
        controlId="floatingInput"
        label="First Name"
        className="mb-3 col-4" >
        <Form.Control
          type="text"
          placeholder="Enter your Fist Name"
          name="first_name"
          value={userState.first_name}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Last Name"
        className="mb-3 col-4" >
        <Form.Control
          type="text"
          placeholder="Enter your Last Name"
          name="last_name"
          value={userState.last_name}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Email Address"
        className="mb-3 col-4" >
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={userState.username}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3 col-4">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={userState.password}
          onChange={handleInputChange} />
      </FloatingLabel>

      <Button
        className="mb-2 col-2"
        variant="primary"
        type="submit"
        onClick={handleRegisterUser} >
        Register
      </Button>

      <Button
        className="mb-3"
        variant="light"
        type="button"
        onClick={handleLogin}>
        Already have an account? Sign In.
      </Button>

      <Button
        variant="link"
        type="button"
        onClick={handleHome}>
        Home Page
      </Button>

    </Form>
  )
}

export default RegisterForm
