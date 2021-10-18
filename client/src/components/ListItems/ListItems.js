import ListGroup from 'react-bootstrap/ListGroup'

const ListItems = ({ applicants }) => {
  return (
    <ListGroup>
      {applicants ? applicants.map(applicant => <ListGroup.Item>{applicant.applicantName}</ListGroup.Item>) : <></>}
    </ListGroup>
  )
}

export default ListItems