import { useState } from 'react'
import {
  Button,
  Modal,
  Row,
  Form
} from 'react-bootstrap'
import './AddSkill.css'

const AddSkill = ({ setParentState }) => {
  // Define all state variables for the component.
  const [show, setShow] = useState(false)
  const [ skillState, setSkillState ] = useState('')
  const [ allSkills, setAllSkills ] = useState([])
  const [missingInput, setMissingInput] = useState({
    missingSkill: false
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
                  placeholder='Enter candidates name'
                  name='applicantName'
                  value={skillState}
                  onChange={handleInputChange}
                />
                {missingInput.missingApplicantName ? <p className="err mt-2">⚠️ Please enter a name</p> : <></>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter candidates email'
                  name='email'
                  value={jobState.email}
                  onChange={handleInputChange}
                />
                {(missingInput.missingEmail || !correctFormat) ? <p className="err mt-2">⚠️ Please enter a valid email address</p> : <></>}
                <Button
                  className="mt-3 createBtn"
                  variant='primary'
                  type='submit'
                  onClick={handleAddApplicant}
                >
                  Add Applicant
                </Button>
              </Form.Group>
            </Form>
          </Row>

          <hr />

          <Row>
            <h3>Skills</h3>
            {jobState ? jobState.applicants.map(({ applicantName }) => <li>{applicantName}</li>) : <></>}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {missingInput.missingApplicants ? <p className="err me-4">⚠️ No skills added yet</p> : <></>}
          <Button
            className="createBtn"
            variant='primary'
            type='submit'
            onClick={handleAddAllApplicants}
          >
            Add New Skills
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  )
}

export default AddSkill
