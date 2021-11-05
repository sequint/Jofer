import NavbarElem from '../../components/NavbarElem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTitle from '../../components/PageTitle'
import Card from 'react-bootstrap/Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import JobAPI from '../../utils/JobAPI'
import UserAPI from '../../utils/UserAPI'
import DeclineModal from '../../components/DeclineModal/DeclineModal'
import Negotiator from '../../components/Negotiator/Negotiator'
import AddApplicant from '../../components/AddApplicant/AddApplicant'
import Button from 'react-bootstrap/Button'
import './ManageJobs.css'

const ManageJobs = () => {

  if (localStorage.getItem("token")) {

    UserAPI.getUser()
      .then(({ data }) => {
        if (data.user_type !== 'Employer') {
          window.location = '/home'
        }
      })

  } else {
    window.location = "/login";
  }

  const [showModal, setShowModal] = useState({
    state: false,
    applicant: []
  })
  
  const [ showOffer, setShowOffer ] = useState({
    show: false,
    applicant: {},
    offered: {}
  })

  const [ greenBorder, setGreenBorder ] = useState(true)

  let job = JSON.parse(localStorage.getItem('clickedManageJob'))

  const getReviewApplicants = (job) => {
    return job.applicants.filter(applicant => applicant.status === 'Review')
  }
  const getInterviewApplicants = (job) => {
    return job.applicants.filter(applicant => applicant.status === 'Interview')
  }
  const getDeclineApplicants = (job) => {
    return job.applicants.filter(applicant => applicant.status === 'Declined')
  }
  const getOfferApplicants = (job) => {
    return job.applicants.filter(applicant => applicant.status === 'Offered')
  }

  const reviewApplicants = getReviewApplicants(job)
  const interviewApplicants = getInterviewApplicants(job)
  const declinedApplicants = getDeclineApplicants(job)
  const offeredApplicants = getOfferApplicants(job)

  const [state, setState] = useState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])

  const [filteredApplicants, setFilteredApplicants] = useState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])

  const setParentState = (state) => {
    const reviewApplicants = getReviewApplicants(job)
    const interviewApplicants = getInterviewApplicants(job)
    const declinedApplicants = getDeclineApplicants(job)
    const offeredApplicants = getOfferApplicants(job)

    setState([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])
    setFilteredApplicants([reviewApplicants, interviewApplicants, declinedApplicants, offeredApplicants])
    localStorage.setItem('clickedManageJob',JSON.stringify(state))

  }

  const handleInputChange = ({ target: { value } }) => {
    const review = state[0].filter(applicant => applicant.applicantName.substring(0, value.length).toUpperCase() === value.toUpperCase())

    const interview = state[1].filter(applicant => applicant.applicantName.substring(0, value.length).toUpperCase() === value.toUpperCase())

    const decline = state[2].filter(applicant => applicant.applicantName.substring(0, value.length).toUpperCase() === value.toUpperCase())

    const offer = state[3].filter(applicant => applicant.applicantName.substring(0, value.length).toUpperCase() === value.toUpperCase())

    setFilteredApplicants([review, interview, decline, offer])
  }

  // used to reorder items in same col
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  // Moves an item from one list to another list.

  const move = (source, destination, droppableSource, droppableDestination, sInd, dInd) => {

    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = filteredApplicants[sInd].splice(droppableSource.index, 1)
    // removed.status = droppableDestination.droppableId
    console.log(droppableDestination.droppableId)

    JobAPI.getEmployerJobs()
      .then(({ data }) => {
        data.forEach(elem => {
          if (elem._id === job._id) {
            elem.applicants.forEach((applicant, index) => {
              if (applicant.email === removed.email) {
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

    destClone.splice(droppableDestination.index, 0, removed)
    const newState = [...state]
    newState[sInd] = sourceClone.filter(applicant => applicant !== removed)
    newState[dInd] = destClone;
    return newState;
  }

  function onDragEnd(result) {
    const { source, destination } = result
    const allInfo = result

    // dropped outside the list
    if (!destination) {
      return
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
      const items = reorder(filteredApplicants[sInd], source.index, destination.index)
      const newState = [...filteredApplicants]
      newState[sInd] = items
      console.log('setting new state')
      setState(newState)
      setFilteredApplicants(newState)
    }
    else if (sInd === 2) {
      JobAPI.getEmployerJobs()
        .then(({ data }) => {
          data.forEach(elem => {
            if (elem._id === job._id) {
              elem.applicants.forEach((applicant, index) => {
                if (applicant.email === allInfo.email) {

                  let reason = applicant.declined.reasons[0]
                  if (reason !== "im not sure why") {
                    revertDecline(allInfo)
                  }
                  else {
                    const result = move(state[sInd], state[dInd], source, destination, sInd, dInd)

                    console.log('setting new state')
                    setState(result)
                    setFilteredApplicants(result)
                  }
                }
              })
            }
          })
        })


    }
    else {
      const result = move(state[sInd], state[dInd], source, destination, sInd, dInd)

      setState(result)
      setFilteredApplicants(result)
    }

    // localStorage.setItem('clickedManageJob', JSON.stringify(elem))
    if (dInd === 2) {
      const storage = 'declined' + job._id
      const declined = allInfo.draggableId
      const declinedUsers = JSON.parse(localStorage.getItem(storage))
      if (declinedUsers) {
        const flag = declinedUsers.filter(email => email === declined)
        if (flag.length !== 0) {
        } else {
          setShowModal({ ...showModal, state: true, applicant: allInfo })
          declinedUsers.push(declined)
          localStorage.setItem(storage, JSON.stringify(declinedUsers))
        }
      } else {
        const declined = allInfo.draggableId
        const declinedUsers = []
        declinedUsers.push(declined)
        localStorage.setItem(storage, JSON.stringify(declinedUsers))

        // execute modal here, since its the first instance of declined
        setShowModal({ ...showModal, state: true, applicant: allInfo })
      }
    }

    const tempOffered = {
      offer: [],
      applicantCounter: [],
      employerCounter: [],
      finalSalary: [],
      applicantCountered: [],
      employerCountered: [],
      applicantAcceptedOffer: [],
      employerAcceptedOffer: [],
      applicantDeclinedCounter: [],
      employerDeclinedCounter: [],
      email:''
    }
    tempOffered.email= allInfo.draggableId

    if (dInd === 3 && sInd !== 2) {
      console.log(allInfo)
      setShowOffer({ ...showOffer, show: true, applicant: allInfo, offered: tempOffered })
      console.log(showOffer)
    }
  }

  const revertDecline = (object) => {

    const { source, destination, } = object
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

    const result = move(state[dInd], state[sInd], destination, source, dInd, sInd)
    setState(result)
    setFilteredApplicants(result)

  }

  const setParentModalState = (theState, revert) => {
    setShowModal({ ...showModal, state: theState })
    if (revert) {
      revertDecline(revert)
      const { draggableId } = revert


      const storage = 'declined' + job._id
      console.log(draggableId)
      const declinedUsers = JSON.parse(localStorage.getItem(storage))

      console.log(declinedUsers)
      if (declinedUsers) {
        const flag = declinedUsers.filter(email => email !== draggableId)
        localStorage.setItem(storage, JSON.stringify(flag))
      }
    }
  }

  const setParentOfferShow = (showState, newJobState, green) => {
    showOffer.show = showState
    setShowOffer({ ...showOffer })
    setGreenBorder(green)
    localStorage.setItem('clickedManageJob', JSON.stringify(newJobState))
    job = newJobState
    JobAPI.update(job._id, job)
      .then(({ data }) => {
        setParentState(job)
        console.log(data)})
      .catch(err => console.log(err))
  }

  let grid = 1

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "white" : "white",
    boxShadow: isDragging ? "10px 10px #FFBA0A" : null,

    // styles we need to apply on draggables
    ...draggableStyle
  })

  return (
    <div className="manageJobsContainer">
      {showModal.state === true ? (
        <DeclineModal
          showState={showModal}
          setParentState={setParentModalState}
          job={job}
        />
      ) : (
        <></>
      )}
      {showOffer.show === true ? (
        <Negotiator
          showState={showOffer}
          setParentState={setParentOfferShow}
          job={job}
          passedNegotiation={showOffer}
        />
      ) : (
        <></>
      )}
      <NavbarElem />
      <PageTitle title={`Job Manager - ${job.name}`} />
      <input
        type="text"
        name="filter"
        className="filter"
        placeholder="Filter Applicants"
        onChange={handleInputChange}
      />
      <Container className="manageJobContainer">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <AddApplicant job={job} setParentState={setParentState} />
            <Col className="column">
              <h2>Review</h2>
              <Card className="usrCard review">
                <Droppable droppableId="Review">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? (
                        filteredApplicants[0].map((applicant, index) => (
                          <Draggable
                            key={applicant.email}
                            draggableId={applicant.email}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card className="mb-2 text-center uCard"

                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                  }}
                                >
                                  <Card.Body>
                                    {applicant.applicantName}
                                  </Card.Body>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <></>
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col className="column">
              <h2>Interviewed</h2>
              <Card className="usrCard interviewed">
                <Droppable droppableId="Interview">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? (
                        filteredApplicants[1].map((applicant, index) => (
                          <Draggable
                            key={applicant.email}
                            draggableId={applicant.email}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card className="mb-2 text-center uCard"
                              
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                                <Card.Body>
                                  {applicant.applicantName}
                                </Card.Body>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <></>
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col className="column">
              <h2>Declined</h2>
              <Card className="usrCard declined">
                <Droppable droppableId="Declined">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? (
                        filteredApplicants[2].map((applicant, index) => (
                          <Draggable
                            key={applicant.email}
                            draggableId={applicant.email}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card className="mb-2 text-center uCard"

                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                  }}
                                >
                                  <Card.Body>
                                    {applicant.applicantName}
                                  </Card.Body>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <></>
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col className="column">
              <h2>Offered</h2>
              <Card className="usrCard offered">
                <Droppable droppableId="Offered">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {true ? (
                        filteredApplicants[3].map((applicant, index) => (
                          <Draggable
                            key={applicant.email}
                            draggableId={applicant.email}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card className="mb-2 text-center uCard"

                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                  }}
                                >
                                  <Card.Body>
                                    {applicant.applicantName}
                                    {(applicant.offered.finalSalary[0] >0) ?
                                      <> ✅</>
                                      : (applicant.offered.applicantAcceptedOffer && applicant.offered.applicantAcceptedOffer[0] === false) || (applicant.offered.employerAcceptedOffer[0]===false) ?
                                        <>❌</>: <Button
                                          className={(applicant.offered.applicantCountered[0] === true && greenBorder) ? 'MJviewJobBtnGreen' : 'MJviewJobBtn'}
                                          onClick={() => { setShowOffer({ ...showOffer, show: true, email: applicant.email, offered: applicant.offered }) }}
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            height="25px"
                                            width="25px"
                                          >
                                            <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1 1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59l.3-.29M20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7v1m.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6z" />
                                          </svg>
                                        </Button>
                                    }
                                  </Card.Body>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <></>
                      )}
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
  );
}

export default ManageJobs
