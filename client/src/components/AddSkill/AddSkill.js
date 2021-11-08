import { useState } from 'react'
import {
  Button,
  Modal,
  Row,
  Form
} from 'react-bootstrap'
import UserAPI from '../../utils'
import './AddSkill.css'

const AddSkill = ({ setParentState }) => {
  // Define all state variables for the component.
  const [show, setShow] = useState(false)
  const [ skillState, setSkillState ] = useState({
    skill: '',
    allSkills: [],
    missingSkill: false
  })

  // Modal show handlers.
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Input type handler.
  const handleInputChange = ({ target: { value } }) => setSkillState({ ...skillState, skill: value })

  // Adding skill to local array handler.
  const handleAddSkill = event => {
    if (event) { event.preventDefault() }

    // Reset missing skill property to false.
    setSkillState({ ...skillState, missingSkill: false })

    // If there is a skill in the input, push it into all skills and clear skill state.
    if (skillState.skill !== '') {
      skillState.allSkills.push(skillState.skill)
      setSkillState({ ...skillState, skill: '' })
    }
    // Otherwise, set the missing skill state to true.
    else {
      setSkillState({ ...skillState, missingSkill: true })
    }

  }

  const handleAddAllSkills = event => {
    if (event) { event.preventDefault() }
    // Send update request for the loged in user to add all skills state to skills in db.
    UserAPI.updateUser(skillState.allSkills).then(({ data }) => console.log(data))
  }

  return(
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="col-2 CreateJobBtn"
          varient="outline-secondary"
          onClick={handleShow}>
          Add a Job
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Skills
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Form>
              <Form.Group className='mb-3' controlId='applicantName'>
                <Form.Label>Skill Name</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter a skill'
                  name='skill'
                  value={skillState}
                  onChange={handleInputChange}
                />
                {skillState.missingSkill ? <p className="err mt-2">⚠️ Please enter a skill</p> : <></>}
              </Form.Group>
              <Button
                className="mt-3 createBtn"
                variant='primary'
                type='submit'
                onClick={handleAddSkill}
              >
                Add Skill
              </Button>
            </Form>
          </Row>

          <hr />

          <Row>
            <h3>Skills</h3>
            {skillState.allSkills.length > 0 ? skillState.allSkills.map(skill => <li>{skill}</li>) : <></>}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {skillState.allSkills.length > 0 ? <p className="err me-4">⚠️ No skills added yet</p> : <></>}
          <Button
            className="createBtn"
            variant='primary'
            type='submit'
            onClick={handleAddAllSkills}
          >
            Add New Skills
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  )
}

export default AddSkill
