// Import all react bootstrap style element objects.
import RegisterForm from '../../components/RegisterForm'
import SignInForm from '../../components/SignInForm'
import {RegisterForm, SignInForm} from '../../components'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'
import { Row, Col, Card, Container } from 'react-bootstrap'

const Auth = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>The To-Do List Application</Card.Title>
          <Card.Text>
            Create and manage a list of tasks or items that you need to complete with a simple and easy-to-use User Interface.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Created by Quinton Fults</Card.Footer>
      </Card>
      <Container>
        <Row>
          <Col sm={6}>
            <RegisterForm />
          </Col>
          <Col sm={6}>
            <SignInForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Auth
