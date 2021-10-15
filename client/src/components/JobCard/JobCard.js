import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './JobCard.css'

const JobCard = ({ job }) => {
  console.log(job)

  const returnStatusColor = status => {

    switch (status) {
      case 'review':
        return 'Info'
      default:
        return 'Light'
    }

  }

  console.log(returnStatusColor(job.status))

  return(
    <>
      <Card className="m-2">
        <Card.Header className="status" bg="info" as="h5">{job.status}</Card.Header>
        <Card.Body>
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            Company: {job.company}
          </Card.Text>
          <Card.Text>
            Department: {job.type}
          </Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default JobCard
