import { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import './ApplicantFilter.css'

const ApplicantFilter = ({ applicants }) => {
  const [ filteredApplicants, setFilteredApplicants ] = useState([])

  useEffect(() => {
    setFilteredApplicants(applicants)
  }, [])

  return(
    <>
      <input type="text" className="filter" placeholder="Filter Applicants" />
      <UserCard applicants={filteredApplicants} />
    </>
  )
}

export default ApplicantFilter