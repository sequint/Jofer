import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserAPI from '../../utils/UserAPI'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import './RegisterForm.css'

const RegisterForm = () => {
  const [userState, setUserState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: 'applicant',
    company: ''
  })

  const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleRegisterUser = event => {
    event.preventDefault()
    console.log(userState)
    if(validateEmail(userState.email)){
      console.log(userState.email)
      UserAPI.register(userState)
        .then(() => {
          alert('User Registered!')
          setUserState({ ...userState, first_name: '', last_name: '', email: '', password: '' })
          window.location = '/login'
        })
        .catch(err => console.error(err))
    }else{
      console.log("email not valid")
    }
   
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
        label="👤 First Name"
        className="mb-3 col-5 style" >
        <Form.Control
          type="text"
          placeholder="Enter your Fist Name"
          name="first_name"
          value={userState.first_name}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="👥 Last Name"
        className="mb-3 col-5 style" >
        <Form.Control
          type="text"
          placeholder="Enter your Last Name"
          name="last_name"
          value={userState.last_name}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="📧 Email"
        className="mb-3 col-5 style" >
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={userState.username}
          onChange={handleInputChange} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="🔐 Password"
        className="mb-3 col-5 style">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={userState.password}
          onChange={handleInputChange} />
      </FloatingLabel>

      <Button
        className="mb-2 col-5"
        variant="primary style"
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
