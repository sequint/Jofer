import { useEffect, useState } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import './Home.css'

const Home = () => {


  const [jobs, setJobs] = useState([{
   
  }])
  const [filteredJobs, setFilteredJobs] = useState([{
   
  }])

  useEffect(() => {



    
    JobAPI.getAllJobs()
      .then(({ data }) => {
        setJobs(data)     
      })
      .catch(err => console.log('err'))

    if (!localStorage.getItem("token")) {
      window.location = "/login"
    }
    
    if (jobs.length > 0) {
      setFilteredJobs({ ...jobs })
    }

  }, [])


  return (
    <>
      <NavbarElem />
      
      <PageTitle title='Welcome User' />
      {jobs ? jobs.map(job => <h1>its working</h1>) : <h1>You don't have any posted jobs</h1>}
    </>
  )
}

export default Home
