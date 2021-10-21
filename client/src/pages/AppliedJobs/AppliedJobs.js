import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import AppliedJobCard from '../../components/AppliedJobCard'

const AppliedJobs = () => {

  if (localStorage.getItem("token")) {

  } else {
    window.location = "/login";
  }

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
      <PageTitle title='My Jobs' />
      {jobs.map(job => <AppliedJobCard job={job} />)}

    </>

  )
}

export default AppliedJobs
