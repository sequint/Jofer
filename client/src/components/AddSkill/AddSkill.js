import { useState } from 'react'
import {
  Button,
  Modal,
  Row,
  Form
} from 'react-bootstrap'
import UserAPI from '../../utils/UserAPI'
import './AddSkill.css'

const AddSkill = () => {
  // Define all state variables for the component.
  const [show, setShow] = useState(false)
  const [ skillState, setSkillState ] = useState({
    skill: '',
    allSkills: [],
    missingSkill: false,
    missingAllSkills: false
  })

  // Modal show handlers.
  const handleClose = () => {
    // Reset all states and close the modal.
    setSkillState({
      skill: '',
      allSkills: [],
      missingSkill: false,
      missingAllSkills: false
    })
    setShow(false)
  } 
  const handleShow = () => setShow(true)

  // Input type handler.
  const handleInputChange = ({ target: { value } }) => {
    // Reset missing skill property to false.
    skillState.missingSkill = false
    setSkillState({ ...skillState })
    // Set skill state to the target value.
    setSkillState({ ...skillState, skill: value })
  }

  // Adding skill to local array handler.
  const handleAddSkill = event => {
    if (event) { event.preventDefault() }

    // If there is a skill in the input, push it into all skills and clear skill state.
    if (skillState.skill !== '') {
      skillState.allSkills.push(skillState.skill)
      setSkillState({ ...skillState, skill: '', missingAllSkills: false })
    }
    // Otherwise, set the missing skill state to true.
    else {
      setSkillState({ ...skillState, missingSkill: true })
    }

  }

  // Handler to update db with new skills added.
  const handleAddAllSkills = event => {
    if (event) { event.preventDefault() }

    // Reset missing all skills.
    setSkillState({ ...skillState, missingAllSkills: false })

    // If all skills array in empty, set all skills missing bool to true.
    if (skillState.allSkills.length === 0) {
      skillState.missingAllSkills = true
      setSkillState({ ...skillState })
    }
    else {

      // Get the current user's information.
      UserAPI.getUser()
        .then(({ data }) => {
          // If there is a response with user data, create a temp variable to store it.
          let tempUser = data
          console.log(tempUser)
          console.log(skillState.allSkills)
          // Loop through allskills and push each new skill into user skills array.
          skillState.allSkills.forEach(tempSkill => {
            tempUser.skills.push(tempSkill) 
          })
          console.log(tempUser)
          // Send update to the db for the user with new skills array.
          UserAPI.updateUser(tempUser).then(({ data }) => console.log(data))
        })
        .catch(err => console.log(err))

      // Close the modal.
      handleClose()
    }

  }

  return(
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="col-2 CreateJobBtn"
          varient="outline-secondary"
          onClick={handleShow}>
          Add Skills
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
                  value={skillState.skill}
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
          {skillState.missingAllSkills > 0 ? <p className="err me-4">⚠️ No skills added yet</p> : <></>}
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
