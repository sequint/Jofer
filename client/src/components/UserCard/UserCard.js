import Card from 'react-bootstrap/Card'
import ListItems from '../ListItems/ListItems.js'
import './UserCard.css'

const UserCard = ({ candidates }) => {
  console.log(candidates)
  return (
    <>
      <Card className="usrCard">
        <ListItems candidates={candidates}/>
      </Card>
    </>
  )
}

export default UserCard
