import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './JobCard.css'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const JobCard = ({ job, setParentState }) => {

  const saveToLocal = event => {
    event.preventDefault()

    localStorage.setItem('clickedManageJob', JSON.stringify(job))
    window.location = '/managejobs'
    
  }

  return (
    <div className="cardContainer pb-2">
      <Card className="jobCard pCard mt-3">
        <Card.Header
          className='status header'
          as='h5'>{job.name}
          <ConfirmDeleteModal
            setParentState={setParentState}
            job={job} />
        </Card.Header>
        <Card.Body>
          
          <Card.Text>
            <strong>Company: </strong> {job.company}
          </Card.Text>
          <Card.Text>
            <strong>Department: </strong> {job.type}
          </Card.Text>
         <hr/>
          <Row>
            <Card.Text>
              <p className='text-center'><strong>Applicants : </strong>{job.applicants.length}</p>
            </Card.Text>
            <Col>
              <Card.Text>
                <p className='text-end me-4'><strong>Reviewed : </strong>{job.applicants.filter(applicant => applicant.status === 'Review').length}</p>
              </Card.Text>
              <Card.Text>
                <p className='text-end me-4'><strong>Interviewed : </strong>{job.applicants.filter(applicant => applicant.status === 'Interview').length}</p>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <p className='ms-4'><strong>Declined : </strong>{job.applicants.filter(applicant => applicant.status === 'Declined').length}</p>
              </Card.Text>
              <Card.Text>
                <p className='ms-4'><strong>Offered : </strong>{job.applicants.filter(applicant => applicant.status === 'Offered').length}</p>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="bttn">
            <Button
              className="manageJobBtn"
              onClick={saveToLocal}>
              Manage Job
            </Button>
          </div>
        </Card.Footer>

      </Card>
    </div>
  )
}

export default JobCard
