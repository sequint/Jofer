import Card from 'react-bootstrap/Card'
import ListItems from '../ListItems/ListItems.js'
import './UserCard.css'

const UserCard = ({ applicants }) => {
  console.log(applicants)
  return (
    <>
      <Card className="usrCard">
        <ListItems applicants={applicants}/>
      </Card>
    </>
  )
}

export default UserCard
