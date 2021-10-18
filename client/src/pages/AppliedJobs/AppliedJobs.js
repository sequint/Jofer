import { useState, useEffect } from "react"
import NavbarElem from "../../components/NavbarElem"
import PageTitle from "../../components/PageTitle"
import JobAPI from "../../utils/JobAPI"
import JobCard from '../../components/JobCard/JobCard'

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([])

  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    JobAPI.getCandidateJobs()
      .then(({ data }) => setJobs(data.userJobs))
      .catch(err => console.log('err'))
  }, [])

  console.log(jobs)

  return (
    <>
      <NavbarElem />
      <PageTitle title="My Jobs" />
      {jobs.map(job => <JobCard job={job} />)}
      
    </>
    
  )
}

export default AppliedJobs
