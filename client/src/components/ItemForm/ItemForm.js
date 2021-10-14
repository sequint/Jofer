import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ItemForm = ({
  text,
  handleInputChange,
  handleAddItem
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your item"
          name="text"
          value={text}
          onChange={handleInputChange} />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={handleAddItem} >
        Add Item
      </Button>
    </Form>
  )
}

export default ItemForm
