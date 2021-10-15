import { useState, useEffect } from "react"
import NavbarElem from "../../components/NavbarElem"
import PageTitle from "../../components/PageTitle"
import JobCard from "../../components/JobCard"
import UserAPI from "../../utils/UserAPI"

const PostedJobs = () => {
  const [ user, setUser ] = useState()

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
      <PageTitle title={displayTitle()} />
      {user ? user.jobs.map(job => <JobCard job={job} />) : <h1>You don't have any posted jobs</h1>}

    </>
  )
}

export default PostedJobs
