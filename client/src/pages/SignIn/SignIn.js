import SignInForm from '../../components/SignInForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/Col'
import './SignIn.css'

const Login = () => {

  return (
    <main className="log">
      <Container className="login">
        <Row>
          <h1 className="text-center mb-4 mt-5 Text">Log In</h1>
          <SignInForm />
        </Row>
        <hr />
        <Row className="text-center mt-3 signUp">
          <h5 className="font">Don't have an Account?</h5>
          <Col className="col-4">
            <p>Applicant <a href="/auth">Sign Up</a></p>
          </Col>
          <Col className="col-4">
            <p>Employer <a href="/employer">Sign Up</a></p>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login