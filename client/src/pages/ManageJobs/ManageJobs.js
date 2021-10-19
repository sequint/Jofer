import NavbarElem from '../../components/NavbarElem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from "../../components/PageTitle"
import Card from 'react-bootstrap/Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import JobAPI from '../../utils/JobAPI'
import './ManageJobs.css'

const ManageJobs = () => {

  let job = JSON.parse(localStorage.getItem('clickedManageJob'))

  const getReviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Review')
  }
  const getInterviewApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Interview')
  }
  const getDeclineApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Declined')
  }
  const getOfferApplicants = _ => {
    return job.applicants.filter(applicant => applicant.status === 'Offered')
  }

  let reviewApplicants = getReviewApplicants()
  let interviewApplicants = getInterviewApplicants()
  let declinedApplicants = getDeclineApplicants()
  let offeredApplicants = getOfferApplicants()

  const [state, setState] = useState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])

  const [filteredApplicants, setFilteredApplicants] = useState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])

  const handleInputChange = ({ target: { value } }) => {
    let review = state[0].filter(applicant => applicant.applicantName.substring(0, value.length) === value)

    let interview = state[1].filter(applicant => applicant.applicantName.substring(0, value.length) === value)

    let decline = state[2].filter(applicant => applicant.applicantName.substring(0, value.length) === value)

    let offer = state[3].filter(applicant => applicant.applicantName.substring(0, value.length) === value)

    setFilteredApplicants([review, interview, decline, offer])
  }

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
    const [removed] = filteredApplicants[sInd].splice(droppableSource.index, 1)
    removed.status= droppableDestination.droppableId
    
    JobAPI.getEmployerJobs()
      .then(({data})=>{
        data.forEach(elem =>{
          if(elem._id===job._id){ 
            elem.applicants.forEach((applicant, index)=>{
              if(applicant.email===removed.email){
                applicant.status = droppableDestination.droppableId
                localStorage.setItem('clickedManageJob', JSON.stringify(elem))
                JobAPI.update(job._id, elem)
                  .then(({ data }) => console.log(data))
                  .catch(err => console.log(err))
              }
            })
          }
        })
      })

    destClone.splice(droppableDestination.index, 0, removed);
    const newState = [...state];
    newState[sInd] = sourceClone.filter(applicant => applicant !== removed)
    newState[dInd] = destClone;

    return newState;
  }

  function onDragEnd(result) {
    const { source, destination } = result;
    const allInfo = result

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
      
      const items = reorder(filteredApplicants[sInd], source.index, destination.index);
      const newState = [...filteredApplicants];
      newState[sInd] = items;
      setState(newState);
      setFilteredApplicants(newState)
    } else {
      
      const result = move(state[sInd], state[dInd], source, destination,sInd, dInd);
     
      
      setState(result)
      setFilteredApplicants(result)
      
    }


    // localStorage.setItem('clickedManageJob', JSON.stringify(elem))
    if(dInd===2)
    {
      let storage = 'declined' + job._id 
      console.log(storage)
      const declined = allInfo.draggableId
      let declinedUsers = JSON.parse(localStorage.getItem(storage))
      if(declinedUsers){

        let flag = declinedUsers.filter(email => email=== declined)
        if(flag.length !=0){
          console.log("dont do anything")

        }else{
          console.log("not in array")
          //execute modal here


          declinedUsers.push(declined)
          localStorage.setItem(storage, JSON.stringify(declinedUsers))
        }
      }
      else{
        const declined = allInfo.draggableId
        let declinedUsers = []
        declinedUsers.push(declined)
        console.log("no users in declined")
        localStorage.setItem(storage, JSON.stringify(declinedUsers))

        //execute modal here, since its the first instance of declined
      }
    }

  }



  return (
    <div className="manageJobsContainer">
      <NavbarElem />
      <PageTitle title="Job Manager - Job Title" />
      <input
        type="text"
        name="filter"
        className="filter"
        placeholder="Filter Applicants"
        onChange={handleInputChange}
      />
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Col>
              <h2>Review</h2>
              <Card className="usrCard">

                <Droppable droppableId='Review' >
                  {(provided, snapshot) => (

                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? filteredApplicants[0].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
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
                      {true? filteredApplicants[1].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
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
                      {true ? filteredApplicants[2].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
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
                      {true ? filteredApplicants[3].map((applicant, index) => <Draggable key={applicant.email} draggableId={applicant.email} index={index}>
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
    </div>
  )
}

export default ManageJobs
