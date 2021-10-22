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

  const runSetParentState = (state) => {
    setParentState(state)
  }

  return (
    <div className="cardContainer">
      <Card className="jobCard">
        <Card.Body>
          <ConfirmDeleteModal runSetParentState={runSetParentState} job={job} />
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
