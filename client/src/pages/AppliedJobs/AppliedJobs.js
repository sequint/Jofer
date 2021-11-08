import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import AppliedJobCard from '../../components/AppliedJobCard/AppliedJobCard'
import UserAPI from '../../utils/UserAPI'
import {DropdownButton} from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CreateJob from '../../components/CreateJobModal'
import AddApplicantJob from '../../components/AddApplicantJob'
import './AppliedJobs.css'

const AppliedJobs = () => {

  if (localStorage.getItem("token")) {

    UserAPI.getUser()
      .then(({ data }) => {
        if (data.user_type !== 'Applicant') {
          window.location = '/home'
        }
      })

  } else {
    window.location = "/login";
  }

  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [form, setFormValue] = useState({
    filter: 'none',
  })


  const [state, setState] = useState([])
 
  
 

  const getReviewApplicants = (userJobs) => {
    console.log(userJobs)
    let review = userJobs.filter(status => status.status === 'Review')
    console.log(review)
    return review
    
  }
  const getInterviewApplicants = (userJobs) => {
    return userJobs.filter(status => status.status  === 'Interview')
  }
  const getDeclineApplicants = (userJobs) => {
    return userJobs.filter(status => status.status  === 'Declined')
  }
  const getOfferApplicants = (userJobs) => {
    return userJobs.filter(status => status.status  === 'Offered')
  }
  const loadAlUserJobs = () => {

    UserAPI.getUser()
      .then(({ data }) => {
        console.log(...data.jobs)
        const review = getReviewApplicants(data.jobs)
        console.log(review)
        const interview = getInterviewApplicants(data.jobs)
        const declined = getDeclineApplicants(data.jobs)
        const offered = getOfferApplicants(data.jobs)
        let array = []
        array.push(review)
        array.push(interview)
        array.push(declined)
        array.push(offered)
        setUserJobs(array)
      })

  }

  const [userJobs, setUserJobs] = useState([])
  

  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    JobAPI.getCandidateJobs()
      .then(({ data }) => {
        setJobs(data.userJobs)
        setFilteredJobs(data.userJobs)
        console.log(jobs)
        loadAlUserJobs()
      })
      .catch(err => console.log('err'))

  

    
    
    
  }, [])

  const Radio = ({ label, id, handleChange, name, form }) => (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        onChange={handleChange}
        value={id}
        checked={form[name] === id}
      />
      <label htmlFor={id}>{label}</label>
      <br />
    </>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log({...e.target});
    setFormValue((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))

    switch (value) {
      case 'all':
        setFilteredJobs(jobs)
        break
      case 'review':
        let review = jobs.filter(status => status.status === 'Review')
        setFilteredJobs(review)
        break
      case 'interviewed':
        let interviewed = jobs.filter(status => status.status === 'Interview')
        setFilteredJobs(interviewed)
        break
      case 'declined':
        let declined = jobs.filter(status => status.status === 'Declined')
        setFilteredJobs(declined)
        break
      case 'offered':
        let offered = jobs.filter(status => status.status === 'Offered')
        setFilteredJobs(offered)
        break
      default:
        break
    }
    console.log(value)
  };

  const setParentState = () => {
    JobAPI.getCandidateJobs()
      .then(({ data }) => {
        setJobs(data.userJobs)
        setFilteredJobs(data.userJobs)
        console.log(jobs)
      })
      .catch(err => console.log('err'))

    loadAlUserJobs()

  }

  const move = (source, destination, droppableSource, droppableDestination, sInd, dInd, allInfo) => {

    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = userJobs[sInd].splice(droppableSource.index, 1)
    // removed.status = droppableDestination.droppableId
    console.log(droppableDestination.droppableId)

    JobAPI.getEmployerJobs()
      .then(({ data }) => {
        data.forEach(elem => {
          if (elem._id === allInfo.draggableId) {
            elem.status = droppableDestination.droppableId
            JobAPI.update(elem._id, elem)
              .then(({ data }) => console.log(data))
              .catch(err => console.log(err))
          }
        })
      })

    destClone.splice(droppableDestination.index, 0, removed)
    const newState = [...userJobs]
    newState[sInd] = sourceClone.filter(applicant => applicant !== removed)
    newState[dInd] = destClone;
    return newState;
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }





  function onDragEnd(result) {
    const { source, destination } = result
    // dropped outside the list
    const allInfo = result
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
      const items = reorder(userJobs[sInd], source.index, destination.index)
      const newState = [...userJobs]
      newState[sInd] = items
      console.log('setting new state')
      setUserJobs(newState)
      
    }
    else {
      const result = move(userJobs[sInd], userJobs[dInd], source, destination, sInd, dInd, allInfo)

      setUserJobs(result)
      
    }
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
    <>
      <NavbarElem/>
      <PageTitle title='My Jobs' />
      <Container className="manageJobContainer">
        <AddApplicantJob
          setParentState={setParentState}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            
            <Col className="column">
              <h2>Review</h2>
              <Card className="usrCard review">
                <Droppable droppableId="Review">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {userJobs.length > 0 ? (
                        userJobs[0].map((applicant, index) => (
                          <Draggable
                            key={applicant._id}
                            draggableId={applicant._id}
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
                                    <h5>{applicant.name}</h5>
                                    <h6>{applicant.company}</h6>
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
              <Card className="usrCard Interviewed">
                <Droppable droppableId="Interview">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {userJobs.length > 0 ? (
                        userJobs[1].map((applicant, index) => (
                          <Draggable
                            key={applicant._id}
                            draggableId={applicant._id}
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
                                    <h5>{applicant.name}</h5>
                                    <h6>{applicant.company}</h6>
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
                      {userJobs.length > 0 ? (
                        userJobs[2].map((applicant, index) => (
                          <Draggable
                            key={applicant._id}
                            draggableId={applicant._id}
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
                                    <h5>{applicant.name}</h5>
                                    <h6>{applicant.company}</h6>
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
                      {userJobs.length > 0  ? (
                        userJobs[3].map((applicant, index) => (
                          <Draggable
                            key={applicant._id}
                            draggableId={applicant._id}
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
                                    <h5>{applicant.name}</h5>
                                    <h6>{applicant.company}</h6>
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
      <hr></hr>
      <PageTitle title='Employer Posted Jobs' />
      <row className="Filter">
        <div className="filterBtn">
          <DropdownButton
            className='col-2'
            variant="outline"
            id="dropdown-basic-button"
            title="Filter">
            <Radio
              form={form}
              name="filter"
              label="All"
              id="all"
              handleChange={handleChange}
            />
            <Radio
              form={form}
              name="filter"
              label="In Review"
              id="review"
              handleChange={handleChange}
            />
            <Radio
              form={form}
              name="filter"
              label="Interviewed"
              id="interviewed"
              handleChange={handleChange}
            />
            <Radio
              form={form}
              name="filter"
              label="Declined"
              id="declined"
              handleChange={handleChange}
            />
            <Radio
              form={form}
              name="filter"
              label="Offered"
              id="offered"
              handleChange={handleChange}
            />
          </DropdownButton>
        </div>
      </row>
      <Container>
        {filteredJobs.slice(0).reverse().map(job => <AppliedJobCard job={job} setParentState={setParentState} />)}
      </Container>



    </>

  )

}

export default AppliedJobs
