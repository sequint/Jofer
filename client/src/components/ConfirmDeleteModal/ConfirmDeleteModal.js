import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'

const ConfirmDeleteModal = ({job, setParentState}) => {

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const handleConfirmDelete = () => {
    if(job._id){
      JobAPI.delete(job._id)
        .then(() => {
          console.log('deleted')
          setShow(false)
          UserAPI.getUser()
            .then(({ data }) => setParentState(data))

        })

    }else{
      console.log("deleting")
      console.log(job)
      JobAPI.getAllJobs()
      .then(({data}) =>{
        
       let applicants = data[0].applicants
       console.log(applicants)
       applicants = applicants.filter(applicant =>applicant.email !== job.email)
       console.log(applicants)
       data[0].applicants = applicants
       JobAPI.update(data[0]._id,data[0])
       .then(()=>{
         console.log('updated')
         setParentState()
         setShow(false)

       })

      })



      
    
      // setParentState(job)
    }
   
  }
  const handleClose = () => {
    setShow(false)
  }

  return(
    <>
    <button onClick={handleShow} className="btn-close"></button>
    <Modal
    show={show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Are you sure you want to delete this job?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
   <p>⚠️ Once you delete this job you will no longer be able to acess the listing.</p>
      <Button variant="primary" type="submit" onClick={handleConfirmDelete}>
        Confirm
      </Button>
      <Button variant="primary" type="submit" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
  
}

export default ConfirmDeleteModal