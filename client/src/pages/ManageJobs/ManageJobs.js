import NavbarElem from '../../components/NavbarElem'
import UserCard from '../../components/UserCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from "../../components/PageTitle"
import { useLocation } from 'react-router-dom'


const ManageJobs = () => {
  const location = useLocation()
  const { job } = location.state
  console.log(job)

  const getReviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Review')
  }

  return (
    <>
      <NavbarElem />
      <PageTitle title="Job Manager - Job Title" />
      <Container>
        <Row>
          <Col>
            <h2>Review</h2>
            <UserCard applicants={getReviewApplicants()}/>
          </Col>
          <Col>
            <h2>Interviewed</h2>
            <UserCard />
          </Col>
          <Col>
            <h2>Declined</h2>
            <UserCard />
          </Col>
          <Col>
            <h2>Offered</h2>
            <UserCard />
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default ManageJobs
