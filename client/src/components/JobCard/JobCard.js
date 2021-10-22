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
    <main className="cardCenter media">
      <Card className='m-2 col-5'>
        <Card.Header
          className='status'
          as='h5'>
          {job.status}
        </Card.Header>
        <Card.Body
          className="body">
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
    </main>
  )
}

export default JobCard
