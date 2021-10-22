import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './JobCard.css'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

const JobCard = ({ job, setParentState }) => {
  console.log(job._id)

  const saveToLocal = event => {
    event.preventDefault()

    localStorage.setItem('clickedManageJob', JSON.stringify(job))
    window.location = '/managejobs'
  }

 

  return (
    <div className="cardContainer">
      <Card className="jobCard">
        <Card.Body>
          <ConfirmDeleteModal setParentState= {setParentState} job={job} />
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            <strong>Company: </strong> {job.company}
          </Card.Text>
          <Card.Text>
            <strong>Department: </strong> {job.type}
          </Card.Text>
          <Button
            variant='outline-secondary'
            onClick={saveToLocal}>
            Manage Job
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default JobCard
