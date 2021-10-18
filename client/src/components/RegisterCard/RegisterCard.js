import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RegisterCard = () => {

  const handleRegisterAuth = () => {
    window.location = '/auth'
  }

  const handleEmployerAuth = () => {
    window.location = '/employer'
  }

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Who are you signing up as?</Card.Title>
        <Row>
          <Col>
            Are you an Applicate? Sign Up Below.
            <br />
            <Button
              className="mt-3"
              variant="primary"
              type="button"
              onClick={handleRegisterAuth}>
              Sign Up
            </Button>
          </Col>
          <Col>
            Are you an Employer? Sign Up Below.
            <br />
            <Button
              className="mt-3"
              variant="primary"
              type="button"
              onClick={handleEmployerAuth}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default RegisterCard