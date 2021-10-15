import { useState, useEffect } from "react"
import NavbarElem from "../../components/NavbarElem"
import PageTitle from "../../components/PageTitle"
import UserAPI from "../../utils/UserAPI/UserAPI"

const AppliedJobs = () => {
  const [ jobs, setJobs ] = useState([])

  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    UserAPI.getUser()
      .then(({ data }) => setJobs(data.jobs))
      .catch(err => window.location = '/auth')
  }, [])

  return (
    <>
      <NavbarElem />
      <PageTitle title="My Jobs" />
    </>
  )
}

export default AppliedJobs
