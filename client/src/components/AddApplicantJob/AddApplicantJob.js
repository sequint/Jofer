import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI/index.js'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import './AddApplicantJob.css'

const AddApplicantJob = ({ setParentState }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [jobState, setJobState] = useState({
    name: '',
    applicantName: '',
    company: '',
    type: '',
    status: 'Review',
    email: '',
    declineReason: '',
    applicants: []
  })

  const [missingInput, setMissingInput] = useState({
    missingName: false,
    missingCompany: false,
    missingType: false
  })



  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => setJobState({ ...jobState, company: data.company }))
  }, [])


  const handleInputChange = ({ target: { name, value } }) => {

    setMissingInput({
      missingName: false,
      missingCompany: false,
      missingType: false,
      missingApplicantName: false,
      missingEmail: false
    })

    if (name === 'name') {
      setMissingInput({ ...missingInput, missingName: false })
    }
    else if (name === 'company') {
      setMissingInput({ ...missingInput, missingCompany: false })
    }
    else if (name === 'type') {
      setMissingInput({ ...missingInput, missingType: false })
    }
    setJobState({ ...jobState, [name]: value })

  }

  const handleCreateJob = event => {

    if (event) {
      event.preventDefault()
    }

    let { name, company, type } = jobState

    setMissingInput({ missingName: false, missingCompany: false, missingType: false })

    

    if (name !== '' && company !== '' && type !== '') {

      JobAPI.create(jobState)
        .then(() => {
          setJobState({
            ...jobState,
            name: '',
            company: '',
            type: ''
          })
          UserAPI.getUser()
            .then(({ data }) => setParentState(data))
        })
        .catch(err => console.error(err))

      console.log(event)
      handleClose()
    }
    else {

      let newJobInput = [name, company, type]

      newJobInput.forEach((input, index) => {
        if (input.length === 0) {
          switch (index) {
            case 0:
              missingInput.missingName = true
              setMissingInput({ ...missingInput })
              break
            case 1:
              missingInput.missingCompany = true
              setMissingInput({ ...missingInput })
              break
            case 2:
              missingInput.missingType = true
              setMissingInput({ ...missingInput })
              break
            default:
              break
          }
        }
      })
    }
  }

 

  return (
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
            Add Job
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='name'>
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter the job title'
                  name='name'
                  value={jobState.name}
                  onChange={handleInputChange}
                />
                {missingInput.missingName ? <p className="err mt-2">⚠️ Please enter a job title</p> : <></>}
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='company'>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter your company'
                  name='company'
                  value={jobState.company}
                  onChange={handleInputChange}
                />
                {missingInput.missingCompany ? <p className="err mt-2">⚠️ Please enter a company name</p> : <></>}
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='type'>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  className="gray"
                  type='text'
                  placeholder='Enter the job catagory'
                  name='type'
                  value={jobState.type}
                  onChange={handleInputChange}
                />
                {missingInput.missingType ? <p className="err mt-2">⚠️ Please enter a department for the job</p> : <></>}
              </Form.Group>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="createBtn"
            type='submit'
            onClick={handleCreateJob}
          >
            Create Job
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddApplicantJob
