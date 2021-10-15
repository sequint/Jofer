import NavbarElem from '../../components/NavbarElem'
import JobCard from '../../components/JobCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const ManageJobs = () => {
  return (
    <>
      <NavbarElem />
      <h1>Manage Jobs Page</h1>
      <Container>
        <Row>
          <Col>
            <h2>Skills</h2>
            <JobCard />
          </Col>
          <Col>
            <h2>Interviewed</h2>
            <JobCard />
          </Col>
          <Col>
            <h2>Declined</h2>
            <JobCard />
          </Col>
          <Col>
            <h2>Offered</h2>
            <JobCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ManageJobs
