import NavbarElem from '../../components/NavbarElem'
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from "../../components/PageTitle"
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import JobAPI from '../../utils/JobAPI'

const ManageJobs = () => {
  const location = useLocation()
  const { job } = location.state
  

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


  //used to reorder items in same col
  const reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  //Moves an item from one list to another list.

  const move = (source, destination, droppableSource, droppableDestination,sInd, dInd) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
   
    removed.status= droppableDestination.droppableId
    
    JobAPI.getEmployerJobs()
    .then(({data})=>{
      data.forEach(elem =>{
        if(elem._id===job._id){ 
          elem.applicants.forEach(applicant=>{
            if(applicant.email===removed.email){
              console.log(applicant.email)
              applicant.status = droppableDestination.droppableId
              
            }
            
            
          })
          
          JobAPI.update(elem._id,{elem})
          .then(()=>{
            console.log('I think it worked')
          })
        }
      })
    })

    destClone.splice(droppableDestination.index, 0, removed);
    const newState = [...state];
    newState[sInd] = sourceClone
    newState[dInd] = destClone;

   

    return newState;
  };

  const [state, setState] = useState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])
  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    let sInd = 0
    let dInd = 0
    switch (source.droppableId) {
      case 'Review':
        sInd = 0
        break
      case 'Interview':
        sInd = 1
        break
      case 'Declined':
        sInd = 2
        break
      case 'Offered':
        sInd = 3
        break
      default:
        break
    }
    switch (destination.droppableId) {
      case 'Review':
        dInd = 0
        break
      case 'Interview':
        dInd = 1
        break
      case 'Declined':
        dInd = 2
        break
      case 'Offered':
        dInd = 3
        break
      default:
        break
    }

    if (sInd === dInd) {
      
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination,sInd, dInd);
     
      
      setState(result)
      
      // setState(newState.filter(group => group.length));
    }
  }



  return (
    <>
      <NavbarElem />
      <PageTitle title="Job Manager - Job Title" />
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Col>
              <h2>Review</h2>
              <Card className="usrCard">

                <Droppable droppableId='Review' >
                  {(provided, snapshot) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? state[0].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided, snapshot) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>

              </Card>
            </Col>
            <Col>
              <h2>Interviewed</h2>
              <Card className="usrCard">

                <Droppable droppableId='Interview' >
                  {(provided, snapshot) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true? state[1].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided, snapshot) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>

              </Card>
            </Col>
            <Col>
              <h2>Declined</h2>
              <Card className="usrCard">

                <Droppable droppableId='Declined' >
                  {(provided, snapshot) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? state[2].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided, snapshot) => (


                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{applicant.applicantName}</li>
                        )}</Draggable>) : <></>}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>

              </Card>
            </Col>
            <Col>
              <h2>Offered</h2>
              <Card className="usrCard">

                <Droppable droppableId='Offered' >
                  {(provided, snapshot) => (


                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? state[3].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
                        {(provided, snapshot) => (


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
