import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserAPI from '../../utils/UserAPI'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import './SignInForm.css'

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

  const handleRegister = () => {
    window.location = '/auth'
  }

  const handleHome = () => {
    window.location = '/'
  }

  return (
    <Form
      className="form">

      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3 col-4" >
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="username"
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
        onClick={handleLoginUser} >
        Sign In
      </Button>

      <Button
        className="mb-3"
        variant="light"
        type="button"
        onClick={handleRegister}>
        Don't have an account? Sign Up.
      </Button>

      <Button
        variant="link"
        type="button"
        onClick={handleHome}>
        Go Home
      </Button>

    </Form>
  )
}

export default SignInForm
