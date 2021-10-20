import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobCard from '../../components/JobCard'
import UserAPI from '../../utils/UserAPI'
import CreateJobForm from '../../components/CreateJobForm'

const PostedJobs = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => setUser(data))
      .catch(err => window.location = '/auth')
  }, [])

  const displayTitle = _ => {
    return `Jobs Posted by ${user.first_name}`
  }

  console.log(user)
  

  return (
    <>
      <NavbarElem />
      {user ? <PageTitle title={displayTitle()} /> : <h1>Jobs Posted</h1>}
      {user ? user.jobs.map(job => <JobCard job={job} />) : <h1>You don't have any posted jobs</h1>}
      <CreateJobForm
        user={user}
       />
    </>
  )
}

export default PostedJobs
