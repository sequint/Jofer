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

  console.log(returnStatusColor(job[0].status))

  return(
    <>
      <Card className="m-2">
        <Card.Header className="status" bg="info" as="h5">{job[0].status}</Card.Header>
        <Card.Body>
          <Card.Title>{job[0].name}</Card.Title>
          <Card.Text>
            Company: {job[0].company}
          </Card.Text>
          <Card.Text>
            Department: {job[0].type}
          </Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default JobCard
