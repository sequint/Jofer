import ListGroupItem from 'react-bootstrap/ListGroupItem'

const ItemElem = ({
  id,
  text,
  isDone,
  handleIsDone
}) => {
  return (
    <ListGroupItem 
      action 
      variant={isDone ? "success" : "secondary"}
      onClick={() => handleIsDone(id, !isDone)} >
      {text}
    </ListGroupItem>
  )
}

export default ItemElem
