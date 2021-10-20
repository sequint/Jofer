import RegisterForm from '../../components/RegisterForm/RegisterForm'
import Container from 'react-bootstrap/esm/Container'
import './Auth.css'

const Auth = () => {
  return (
    <main className='reg'>
      <Container>
        <h1 className='text-center mb-4 mt-5 Text'>Applicant Sign Up</h1>
        <RegisterForm />
      </Container>
    </main>
  )
}

export default Auth
