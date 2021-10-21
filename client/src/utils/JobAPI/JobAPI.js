import axios from 'axios'

const JobAPI = {

  // function that makes a axios request to create a new job
  create: (job) => axios.post('/api/jobs', job, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // function that takes if jobId, and update object that is passed into an axios request to update a job by id
  update: (id, updates) => axios.put(`/api/jobs/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // function that takes in jobId and deletes it, also deletes it from the user jobs array
  delete: id => axios.delete(`/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // function that makes a axios request to get all candidate jobs that they've applied to
  getCandidateJobs: _ => axios.get('/api/jobs/emails', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // function that makes a axios request to get all employer created jobs
  getEmployerJobs: _ => axios.get('/api/jobs/id', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

  getAllJobs: _ => axios.get('/api/jobs')

}

export default JobAPI
