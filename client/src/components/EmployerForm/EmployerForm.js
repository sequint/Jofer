import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserAPI from '../../utils/UserAPI'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import './EmployerForm.css'

const EmployerForm = () => {
  const [userState, setUserState] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    user_type: 'employer',
    company: ''
  })
  const [missingInput, setMissingInput] = useState({
    missingFirstName: false,
    missingLastName: false,
    missingEmail: false,
    missingPassword: false,
    missingCompany: false
  })
  const [correctFormat, setCorrectFormat] = useState(true)
  const [usernameExists, setUsernameExists] = useState(false)

  const handleInputChange = ({ target: { name, value } }) => {

    if (name === 'first_name') {
      setMissingInput({ ...missingInput, missingFirstName: false })
    }
    else if (name === 'last_name') {
      setMissingInput({ ...missingInput, missingLastName: false })
    }
    else if (name === 'password') {
      setMissingInput({ ...missingInput, missingPassword: false })
    }
    else if (name === 'username') {
      setMissingInput({ ...missingInput, missingEmail: false })
      setCorrectFormat(true)
    }
    else if (name === 'company') {
      setMissingInput({ ...missingInput, missingCompany: false })
    }

    setUserState({ ...userState, [name]: value })

  }

  const handleRegisterUser = event => {
    event.preventDefault()

    setMissingInput({
      missingFirstName: false,
      missingLastName: false,
      missingEmail: false,
      missingPassword: false,
      missingCompany: false
    })
    setCorrectFormat(true)
    setUsernameExists(false)

    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (
      emailFormat.test(userState.username) &&
      userState.first_name !== '' &&
      userState.last_name !== '' &&
      userState.email !== '' &&
      userState.password !== '' &&
      userState.company !== ''
    ) {

      UserAPI.login(userState)
        .then(({ data: token }) => {

          if (!token) {
            UserAPI.register(userState)
              .then(() => {
                alert('User Registered!')
                setUserState({ ...userState, first_name: '', last_name: '', username: '', password: '', company: '' })
                window.location = '/login'
              })
              .catch(err => console.error(err))
          }
          else {
            setUsernameExists(true)
            setUserState({ ...userState, password: '' })
          }
        })
        .catch(err => console.error(err))
    }
    else{

      if (userState.first_name === '') {
        missingInput.missingFirstName = true
        setMissingInput({ ...missingInput })
      }

      if (userState.last_name === '') {
        missingInput.missingLastName = true
        setMissingInput({ ...missingInput })
      }

      if (!(emailFormat.test(userState.username))) {
        setCorrectFormat(false)
      }

      if (userState.username === '') {
        missingInput.missingEmail = true
        setMissingInput({ ...missingInput })
      }

      if (userState.password === '') {
        missingInput.missingPassword = true
        setMissingInput({ ...missingInput })
      }

      if (userState.company === '') {
        missingInput.missingCompany = true
        setMissingInput({ ...missingInput })
      }

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
      className='form'
    >

      <FloatingLabel
        controlId='floatingInput'
        label='👤 First Name'
        className='mb-3 col-5 style'
      >
        <Form.Control
          type='text'
          placeholder='Enter your Fist Name'
          name='first_name'
          value={userState.first_name}
          onChange={handleInputChange}
        />
        {missingInput.missingFirstName ? <p className="err mt-2">⚠️ Please enter a your first name</p> : <></>}
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingInput'
        label='👥 Last Name'
        className='mb-3 col-5 style'
      >
        <Form.Control
          type='text'
          placeholder='Enter your Last Name'
          name='last_name'
          value={userState.last_name}
          onChange={handleInputChange}
        />
        {missingInput.missingLastName ? <p className="err mt-2">⚠️ Please enter a your last name</p> : <></>}
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingInput'
        label='🏢 Company'
        className='mb-3 col-5 style'
      >
        <Form.Control
          type='text'
          placeholder='Enter your Company Name'
          name='company'
          value={userState.company}
          onChange={handleInputChange}
        />
        {missingInput.missingCompany ? <p className="err mt-2">⚠️ Please enter your company name</p> : <></>}
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingInput'
        label='📧 Email'
        className='mb-3 col-5 style'
      >
        <Form.Control
          type='email'
          placeholder='Enter your email'
          name='username'
          value={userState.username}
          onChange={handleInputChange}
        />
        {(missingInput.missingEmail || !correctFormat) ? <p className="err mt-2">⚠️ Please enter a valid email address</p> : <></>}
        {usernameExists ? <p className="err mt-2">⚠️ This email is already registered</p> : <></>}
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingPassword'
        label='🔐 Password'
        className='mb-3 col-5 style'
      >
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          value={userState.password}
          onChange={handleInputChange}
        />
        {missingInput.missingPassword ? <p className="err mt-2">⚠️ Please enter a password</p> : <></>}
      </FloatingLabel>

      <Button
        className='mb-2 col-5 registerBtn'
        variant='primary'
        type='submit'
        onClick={handleRegisterUser}
      >
        Register
      </Button>

      <Button
        className='mb-3 toSignIn'
        variant='light'
        type='button'
        onClick={handleLogin}
      >
        Already have an account? Sign In.
      </Button>

      <Button
        variant='link'
        type='button'
        onClick={handleHome}
      >
        Home Page
      </Button>

    </Form>
  )
}

export default EmployerForm
