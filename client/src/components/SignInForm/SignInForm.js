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
  const [missingInput, setMissingInput] = useState({
    missingEmail: false,
    missingPassword: false
  })
  const [correctFormat, setCorrectFormat] = useState(true)
  const [usernameExists, setUsernameExists] = useState(true)

  const handleInputChange = ({ target: { name, value } }) => {

    // Change the state of missing input dynamically on input change.
    if (name === 'password') {
      setMissingInput({ ...missingInput, missingPassword: false })
    }
    else if (name === 'username') {
      setMissingInput({ ...missingInput, missingEmail: false })
      setCorrectFormat(true)
    }

    setUserState({ ...userState, [name]: value })

  }

  const handleLoginUser = event => {
    event.preventDefault()

    setMissingInput({ missingEmail: false, missingPassword: false })
    setCorrectFormat(true)
    setUsernameExists(true)

    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailFormat.test(userState.username) && userState.email !== '' && userState.password !== '') {
      UserAPI.login(userState)
        .then(({ data: token }) => {
          if (token) {
            localStorage.setItem('token', token)
            setUserState({ ...userState, name: '', email: '', username: '', password: '' })
            window.location = '/home'
          }
          else {
            setUsernameExists(false)
            setUserState({ ...userState, password: '' })
          }
        })
        .catch(err => console.error(err))
    }
    else {

      if (!(emailFormat.test(userState.email))) {
        setCorrectFormat(false)
      }

      if (userState.email === '') {
        setMissingInput({ ...missingInput, missingEmail: true })
      }

      if (userState.password === '') {
        setMissingInput({ ...missingInput, missingPassword: true })
      }
    }

  }


  return (
    <Form className='form'>

      <FloatingLabel
        controlId='floatingInput'
        label='📧 Email'
        className='mb-3 col-5 style'>

        <Form.Control
          type='email'
          placeholder='Enter your email'
          name='username'
          value={userState.username}
          onChange={handleInputChange}/>

        {(missingInput.missingEmail || !correctFormat) ? <p className="err mt-2">⚠️ Please enter a valid email address</p> : <></>}
        
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingPassword'
        label='🔐 Password'
        className='mb-3 col-5 style'>

        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          value={userState.password}
          onChange={handleInputChange}/>

        {missingInput.missingPassword ? <p className="err mt-2">⚠️ Please enter a password</p> : <></>}
        {!usernameExists ? <p className="err mt-2">⚠️ Email or password is invalid</p> : <></>}
      </FloatingLabel>

      <Button
        className='mb-3 col-5 signInBtn'
        type='submit style'
        onClick={handleLoginUser}>
        Sign In
      </Button>

    </Form>
  )
}

export default SignInForm
