import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './JobCard.css'

const JobCard = ({ job }) => {
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
          <button className="btn-close"></button>
          <Card.Title>{job.name}</Card.Title>

          <Card.Text>Company: {job.company}</Card.Text>
          <Card.Text>Department: {job.type}</Card.Text>
          <Button variant="primary" onClick={saveToLocal}>
            Manage Job
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default JobCard
