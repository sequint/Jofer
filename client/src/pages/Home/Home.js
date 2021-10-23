import { useEffect, useState } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import './Home.css'
import HomeCard from '../../components/HomeCard'

const Home = () => {


  const [jobs, setJobs] = useState([{
   
  }])
  const [filteredJobs, setFilteredJobs] = useState([{
   
  }])

  useEffect(() => { 
    JobAPI.getAllJobs()
      .then(({ data }) => {
        let jobs = []
        let applicants =[]
        data.forEach(job=>{
          job.applicants.forEach(applicant=>{
            if(applicant.status=='Declined')
            {           
              applicants.push(applicant)
            }
          })
          if(applicants.length!==0){
            job.status= "Declined"
            job.applicants = applicants
            applicants = []
            jobs.push(job)
          }
        
        })
        setJobs(jobs)
        setFilteredJobs(jobs)     
      })
      .catch(err => console.log('err'))

    if (!localStorage.getItem("token")) {
      window.location = "/login"
    }
    
    if (jobs.length > 0) {
      setFilteredJobs(jobs)
    }

  }, [])

  const handleInputChange = ({ target: { value,name } }) => {
    
    switch(name){
      case "filterCompany":
        const company = jobs.filter(department => department.company.substring(0, value.length).toUpperCase() === value.toUpperCase())
        setFilteredJobs(company)
        break
      case "filterDepartment":
        const department = jobs.filter(department => department.type.substring(0, value.length).toUpperCase() === value.toUpperCase())
        setFilteredJobs(department)
        break
        default:
          break
    }   
  }



  return (
    <>
      <NavbarElem />
      
      <PageTitle title='Welcome User' />

      <input
        type="text"
        name="filterCompany"
        className="filter"
        placeholder="Search company"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="filterDepartment"
        className="filter"
        placeholder="Search department"
        onChange={handleInputChange}
      />
      {filteredJobs ? filteredJobs.map(job => <HomeCard job={job}></HomeCard>) : <h1>You don't have any posted jobs</h1>}
    </>
  )
}

export default Home
