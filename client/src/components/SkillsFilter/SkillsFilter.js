import { useState } from 'react'
import {
  Button,
  Modal,
  Row,
  Form
} from 'react-bootstrap'
import UserAPI from '../../utils/UserAPI'
import './SkillsFilter.css'

const SkillsFilter = ({ job }) => {
  // Define all state variables for the component.
  const [ show, setShow ] = useState(false)
  const [skillState, setSkillState] = useState({
    skill: '',
    allSkills: [],
    missingSkill: false,
    missingAllSkills: false
  })

  // Show and close modal handlers.
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

  const handleBulkDecline = event => {
    if (event) { event.preventDefault() }

    // Loop through job applicants and get their information with their id.
    job.applicants.forEach(applicant => {
      console.log(applicant)
      UserAPI.getUserByEmail(applicant.email)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err))
    })

  }

  return(
    <>
      <div
        className="mt-2 mb-2 createNewJob">
        <Button
          className="col-2 CreateJobBtn"
          varient="outline-secondary"
          onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
          </svg>
          Filter by Skill
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
            Skills Filter
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
            onClick={handleBulkDecline}
          >
            Bulk Filter & Decline
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  )
}

export default SkillsFilter
