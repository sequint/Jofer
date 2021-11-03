import SignInForm from '../../components/SignInForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/Col'
import logo from '../../image/JOFER.png'
import './SignIn.css'

const Login = () => {
  return (
    <main className='log'>
      <Container className='login'>
        <div className="Logo">
          <img
            height="180px"
            src={logo}
            alt="Jofer Logo" />
        </div>
        <Row>
          <h1 className='text-center mb-4 mt-3 Text'>Log In</h1>
          <SignInForm />
        </Row>
        <hr />
        <Row className='text-center mt-3 signUp'>
          <h5 className='font'>Don't have an Account?</h5>
          <Col className='col-3'>
            <p>Applicant <a href='/auth'>Sign Up</a></p>
          </Col>
          <Col className='col-3'>
            <p>Employer <a href='/employer'>Sign Up</a></p>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login
