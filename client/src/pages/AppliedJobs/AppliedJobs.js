import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import JobCard from '../../components/JobCard/JobCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AppliedJobs = () => {

  if (localStorage.getItem("token")) {

  } else {
    window.location = "/login";
  }

  const [jobs, setJobs] = useState([])
  const[filteredJobs, setFilteredJobs]= useState([])
  const [form, setFormValue] = useState({
    filter: 'none',
  });


  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    JobAPI.getCandidateJobs()
      .then(({ data }) => {
        setJobs(data.userJobs)
        setFilteredJobs(data.userJobs)
      })
      .catch(err => console.log('err'))
  }, [])




 
  const Radio = ({ label, id, handleChange, name, form }) => (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        onChange={handleChange}
        value={id}
        checked={form[name] === id}
      />
      <label htmlFor={id}>{label}</label>
      <br />
    </>
  );
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log({...e.target});
    setFormValue((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))

    switch (value) {
      case 'none':
        setFilteredJobs(jobs)
        break
      case 'review':
        let review = jobs.filter(status=>status.status==='Review')
        setFilteredJobs(review)
        break
      case 'interviewed':
        let interviewed = jobs.filter(status => status.status === 'Interview')
        setFilteredJobs(interviewed)
        break
      case 'declined':
        let declined = jobs.filter(status => status.status === 'Declined')
        setFilteredJobs(declined)
        break
      case 'offered':
        let offered = jobs.filter(status => status.status === 'Offered')
        setFilteredJobs(offered)
        break
      default:
        break
    }
    console.log(value)
  };


  return (
    <>
      <NavbarElem />
      <PageTitle title='My Jobs' />
      <>
        <h3>Filter</h3>
        <Radio
          form={form}
          name="filter"
          label="None"
          id="none"
          handleChange={handleChange}
        />
        <Radio
          form={form}
          name="filter"
          label="In Review"
          id="review"
          handleChange={handleChange}
        />
        <Radio
          form={form}
          name="filter"
          label="Interviewed"
          id="interviewed"
          handleChange={handleChange}
        />
        <Radio
          form={form}
          name="filter"
          label="Declined"
          id="declined"
          handleChange={handleChange}
        />
        <Radio
          form={form}
          name="filter"
          label="Offered"
          id="offered"
          handleChange={handleChange}
        />
      </>
      {filteredJobs.map(job => <JobCard job={job} />)}

    </>

  )
}

export default AppliedJobs
