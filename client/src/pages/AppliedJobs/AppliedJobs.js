import { useState, useEffect } from "react"
import NavbarElem from "../../components/NavbarElem"
import PageTitle from "../../components/PageTitle"
import JobCard from "../../components/JobCard"
import UserAPI from "../../utils/UserAPI"

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([])

  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    console.log('in useEffect')
    UserAPI.getUser()
      .then(({ data }) => setJobs(data.jobs))
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
