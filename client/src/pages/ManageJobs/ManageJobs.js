import NavbarElem from '../../components/NavbarElem'
import UserCard from '../../components/UserCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from "../../components/PageTitle"
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {useState} from 'react'

const ManageJobs = () => {
  const location = useLocation()
  const { job } = location.state
  console.log(job)

  const getReviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Review')
  }
  const getInterviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Interview')
  }
  const getDeclineApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Decline')
  }
  const getOfferApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Offer')
  }

  let reviewApplicants = getReviewApplicants()
  let interviewApplicants = getInterviewApplicants()
  let declinedApplicants = getDeclineApplicants()
  let offeredApplicants = getOfferApplicants()

  const [review,updateReview] = useState(reviewApplicants)
  const [interview, updateInterview]= useState(interviewApplicants)
  const [declined, updateDeclined] = useState(declinedApplicants)
  const [offered, updateOffered]= useState(offeredApplicants)
  

  function handleOnDragEnd(result){
    if(!result.destination) return
    let items
    let reorderedItem
    let sourceArray
    
    switch(result.destination.droppableId){
      case 'review':
        switch(result.source.droppableId){
          case 'review':
            items = Array.from(review)

            [reorderedItem] = items.splice(result.source.index, 1)

            items.splice(result.destination.index, 0, reorderedItem)
            updateReview(items)

          break
          case 'interview':
            //desination=review, soucre = interview
            items = Array.from(review)
            
            sourceArray = Array.from(interview)
           
            console.log(sourceArray)
            reorderedItem= sourceArray.splice(result.source.index,1)
            console.log(reorderedItem)
            updateInterview(sourceArray)
            console.log(interview)
            
            // updateInterview(source)
            items.splice(result.destination.index,0,reorderedItem)
            updateReview(items)
            break
          case 'declined':

            break
          case 'offered':

            break

          default:
            break
        }
       
        break
      case 'interview':
        //  items = Array.from(interview)

        //  [reorderedItem] = items.splice(result.source.index, 1)

        // items.splice(result.destination.index, 0, reorderedItem)
        // updateInterview(items)
        break
       

        default:
          break
    }
   
  }
  return (
    <>
      <NavbarElem />
      <PageTitle title="Job Manager - Job Title" />
      <Container>
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Row>
          <Col>
            <h2>Review</h2>
            <Card className="usrCard">
             
                <Droppable droppableId= 'review' >
                  {(provided)=>(

                  
                  <ul {...provided.droppableProps} ref = {provided.innerRef}>
                    {review ? review.map((applicant, index) =><Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                      {(provided)=>(

                     
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                      )}</Draggable>) : <></>}
                      {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              
            </Card>
          </Col>

          <Col>
            <h2>Interview</h2>
            <Card className="usrCard">
              
                <Droppable droppableId='interview' >
                  {(provided) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {interview ? interview.map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
             
            </Card>
          </Col>
          <Col>
            <h2>Decline</h2>
            <Card className="usrCard">
             
                <Droppable droppableId='declined' >
                  {(provided) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {declined ? declined.map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              
            </Card>
          </Col>
          <Col>
            <h2>Offer</h2>
            <Card className="usrCard">
              
                <Droppable droppableId='offered' >
                  {(provided) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {offered ? offered.map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              
            </Card>
          </Col>
        
        </Row>
        </DragDropContext>
      </Container>
    </>
  )
}

export default ManageJobs
