import SignInForm from '../../components/SignInForm'
import Container from 'react-bootstrap/Container'
import './SignIn.css'

const Login = () => {
  return (
    <main className="log">
      <Container className="login">
        <h1 className="text-center mb-4 mt-5 Text">Log In</h1>
        <SignInForm />
      </Container>
    </main>
  )
}

export default Login