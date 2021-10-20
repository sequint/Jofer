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
    <>
      <Card className='m-2'>
        <Card.Header className='status' as='h5'>{job.status}</Card.Header>
        <Card.Body>
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            Company: {job.company}
          </Card.Text>
          <Card.Text>
            Department: {job.type}
          </Card.Text>
          <Button variant='primary' onClick={saveToLocal}>Manage Job</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default JobCard
