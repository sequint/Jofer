import { useState, useEffect } from 'react'
import ItemElem from '../../components/ItemElem'
import ItemForm from '../../components/ItemForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ItemAPI from '../../utils/ItemAPI'
import UserAPI from '../../utils/UserAPI'
import Button from 'react-bootstrap/Button'
import './Home.css'

const Home = () => {
  // Set items states.
  const [itemState, setItemState] = useState({
    text: '',
    items: []
  })

  // Function that allows you to type in input field, and sets the state on each keystroke.
  const handleInputChange = ({ target: { name, value } }) => setItemState({ ...itemState, [name]: value })

  // On click add the item to the db.
  const handleAddItem = event => {
    event.preventDefault()
    ItemAPI.create({
      text: itemState.text,
      isDone: false
    })
      .then(({ data: item }) => {
        const items = JSON.parse(JSON.stringify(itemState.items))
        items.push(item)
        setItemState({ ...itemState, items, text: '' })
      })
  }


  const handleIsDone = (id, isDone) => {
    // Axios request to update an items bool value of done or not done using items id and isDont prop value.
    ItemAPI.update(id, { isDone })
      .then(() => {
        const items = JSON.parse(JSON.stringify(itemState.items))
        items.forEach(item => {
          if (item._id === id) {
            item.isDone = isDone
          }
        })
        setItemState({ ...itemState, items })
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    window.location = '/signIn'
  }

  // On component render get current user's item data and set that data to the item state.
  useEffect(() => {
    UserAPI.getUser()
      .then(({ data: { items } }) => setItemState({ ...itemState, items }))
      .catch(err => window.location = '/signIn')
  }, [])

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>The To-Do List Application</Card.Title>
          <Card.Text>
            Create and manage a list of tasks or items that you need to complete with a simple and easy-to-use User Interface.
          </Card.Text>
          <Button
            variant="primary"
            onClick={handleSignOut} >
            Sign Out
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">Created by Quinton Fults</Card.Footer>
      </Card>
      <Container className="cont">
        <Row>
          <Col sm={6}>
            <ItemForm
              text={itemState.text}
              handleInputChange={handleInputChange}
              handleAddItem={handleAddItem} />
          </Col>
          <Col sm={6}>
            {
              itemState.items.map(({
                _id,
                text,
                isDone
              }) => (<ItemElem
                id={_id}
                text={text}
                isDone={isDone}
                handleIsDone={handleIsDone} />))
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
