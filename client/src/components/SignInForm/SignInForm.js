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
        console.log(token)
        if (token) {
          localStorage.setItem('token', token)
        setUserState({ ...userState, name: '', email: '', username: '', password: '' })
        window.location = '/home'
        }
        else {
          alert('Invalid username or password.')
          setUserState({ ...userState, name: '', email: '', username: '', password: '' })
        }
        
      })
      .catch(err => console.error(err))
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
      </FloatingLabel>

      <Button
        className='mb-3 col-5 signInBtn'
        type='submit'
        onClick={handleLoginUser}
      >
        Sign In
      </Button>

      <Button
        variant='link'
        type='button'
        onClick={handleHome}
      >
        Go Home
      </Button>

    </Form>
  )
}

export default SignInForm
