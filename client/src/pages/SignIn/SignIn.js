import SignInForm from '../../components/SignInForm'
import Container from 'react-bootstrap/Container'
import './SignIn.css'

const Login = () => {
  return (
    <>
      <h1>LogIn Page</h1>
      <Container className="login">
          <SignInForm />
      </Container>
    </>
  )
}

export default Login