import ListGroup from 'react-bootstrap/ListGroup'

const ListItems = ({ candidates }) => {
  console.log(candidates)
  return (
    <ListGroup>
      {candidates ? candidates.map(applicant => <ListGroup.Item>{applicant.applicantName}</ListGroup.Item>) : <></>}
    </ListGroup>
  )
}

export default ListItems