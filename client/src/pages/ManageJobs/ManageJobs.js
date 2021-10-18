import NavbarElem from '../../components/NavbarElem'
import UserCard from '../../components/UserCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from "../../components/PageTitle"
import { useLocation } from 'react-router-dom'
import ApplicantFilter from '../../components/ApplicantFilter/ApplicantFilter'

const ManageJobs = () => {
  const location = useLocation()
  const { job } = location.state

  const getReviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Review')
  }
  const getInterviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Interview')
  }
  const getDeclineApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Decline')
  }
  const getOfferApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Offer')
  }

  return (
    <>
      <NavbarElem />
      <PageTitle title="Job Manager - Job Title" />
      <Container>
        <Row>
          <Col>
            <h2>Review</h2>
            <ApplicantFilter applicants={getReviewApplicants()} />
          </Col>
          <Col>
            <h2>Interview</h2>
            <UserCard applicants={getInterviewApplicants()}/>
          </Col>
          <Col>
            <h2>Decline</h2>
            <UserCard applicants={getDeclineApplicants()}/>
          </Col>
          <Col>
            <h2>Offer</h2>
            <UserCard applicants={getOfferApplicants()}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManageJobs
