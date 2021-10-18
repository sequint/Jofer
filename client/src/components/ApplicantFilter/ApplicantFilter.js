import { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import './ApplicantFilter.css'

const ApplicantFilter = ({ applicants }) => {
  const [ filteredApplicants, setFilteredApplicants ] = useState([])

  useEffect(() => {
    setFilteredApplicants(applicants)
  }, [])

  const handleInputChange = ({ target: { value } }) => {
    let tempAppArray = applicants.map(applicant => applicant.applicantName.substring(0, value.length))
    console.log(tempAppArray)
    // setFilteredApplicants(applicants.filter(applicant => applicant))
  }

  return(
    <>
      <input
        type="text"
        className="filter"
        placeholder="Filter Applicants"
        onChange={handleInputChange}
      />
      <UserCard applicants={filteredApplicants} />
    </>
  )
}

export default ApplicantFilter