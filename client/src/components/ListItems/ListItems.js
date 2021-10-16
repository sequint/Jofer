import ListGroup from 'react-bootstrap/ListGroup'

const ListItems = ({ applicants }) => {
  console.log(applicants)
  return (
    <ListGroup>
      {applicants ? applicants.map(applicant => <ListGroup.Item>{applicant.applicantName}</ListGroup.Item>) : <></>}
    </ListGroup>
  )
}

export default ListItems