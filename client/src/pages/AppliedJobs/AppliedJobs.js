import { useState, useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import JobAPI from '../../utils/JobAPI'
import AppliedJobCard from '../../components/AppliedJobCard/AppliedJobCard'
import UserAPI from '../../utils/UserAPI'
import DropdownButton from 'react-bootstrap/DropDownButton'
import './AppliedJobs.css'

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [form, setFormValue] = useState({
    filter: 'none',
  })
  const [userType, setUserType] = useState({
    type: ''
  })


  // On page mount get the current user, extract their jobs array and set to state.
  useEffect(() => {
    JobAPI.getCandidateJobs()
      .then(({ data }) => {
        setJobs(data.userJobs)
        setFilteredJobs(data.userJobs)
      })
      .catch(err => console.log('err'))

    UserAPI.getUser()
      .then(({ data }) => {
        console.log(data.user_type)
        setUserType({ type: data.user_type })
      })
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
      case 'all':
        setFilteredJobs(jobs)
        break
      case 'review':
        let review = jobs.filter(status => status.status === 'Review')
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
  }

  const checkUserBeforeRender = _ => {

    console.log('in function')

    if (localStorage.getItem("token")) {
      console.log('token verified')

      console.log(UserAPI.getUser())
      console.log(userType)

      if (userType.type !== 'applicant') {
        // window.location = '/home'
        console.log('not a user')
      }
      else {
        console.log('about to throw return')
        return (
          <>
            <NavbarElem />
            <PageTitle title='My Jobs' />
            <row
              className="mt-2 mb-2 createNewJob">
              <col className='col-10'></col>
              <DropdownButton className='col-2 filterBtn' id="dropdown-basic-button" title="Filter">
                <Radio
                  form={form}
                  name="filter"
                  label="All"
                  id="all"
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
              </DropdownButton>
            </row>

            {filteredJobs.map(job => <AppliedJobCard job={job} />)}

          </>

        )
      }

    }
    else {
      window.location = "/login";
    }

  }

  return userType.type ? checkUserBeforeRender() : <></>

}

export default AppliedJobs
