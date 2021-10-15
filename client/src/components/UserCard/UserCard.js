import Card from 'react-bootstrap/Card'
import ListItems from '../ListItems/ListItems.js'
import './UserCard.css'

const UserCard = () => {
  return (
    <>
      <Card className="usrCard">
        <ListItems/>
      </Card>
    </>
  )
}

export default UserCard
