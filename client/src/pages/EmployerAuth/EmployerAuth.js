import EmployerForm from '../../components/EmployerForm'
import Container from 'react-bootstrap/esm/Container'
import './EmployerAuth.css'

const EmployerAuth = () => {
  return (
    <main className='emReg'>
      <Container>
        <h1 className='text-center mb-4 mt-5 Text'>Employer Sign Up</h1>
        <EmployerForm />
      </Container>
    </main>
  )
}

export default EmployerAuth
