import ListGroup from 'react-bootstrap/ListGroup'

const ListItems = ({ candidates }) => {
  console.log(candidates)
  return (
    <ListGroup>
      {candidates ? candidates.map(applicant => <ListGroup.Item>{applicant.email}</ListGroup.Item>) : <></>}
    </ListGroup>
  )
}

export default ListItems