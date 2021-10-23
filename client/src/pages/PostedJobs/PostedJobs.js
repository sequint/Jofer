import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobCard from '../../components/JobCard'
import UserAPI from '../../utils/UserAPI'
import CreateJob from '../../components/CreateJobModal'

const PostedJobs = () => {

  if (localStorage.getItem("token")) {

    UserAPI.getUser()
      .then(({ data }) => {
        console.log(data)
        if (data.user_type !== 'employer') {
          window.location = '/home'
        }else{

          
        }
      })

  } else {
    window.location = "/login";
  }
  
  const [user, setUser] = useState()

  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => {  
        
        setUser(data)
      })
      // .catch(err => window.location = '/auth')
  }, [])

  const displayTitle = _ => {
    return `Jobs Posted by ${user.first_name}`
  }

  const setParentState = (data)=>{
    setUser(data)
  }
  
  

  
  
  
  return (
    <>
      <NavbarElem />
      {user ? <PageTitle title={displayTitle()} /> :<></>}
      {user ? <CreateJob 
        setParentState={setParentState}
      />:<></>}
      {user ? user.jobs.slice(0).reverse().map(job => <JobCard setParentState={setParentState} job={job} />) : <></>}
      
    </>
  )
}

export default PostedJobs