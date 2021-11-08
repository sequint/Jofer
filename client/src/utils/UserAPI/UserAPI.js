import axios from 'axios'

// Create api object for user CRUD routes.
const UserAPI = {
  // Create property that get individual user.
  getUser: _ => axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // Function that gets a user by their id.
  getUserByEmail: userEmail => axios.get(`/api/users/${userEmail}`),
  // Create property that uses axios request to register a user.
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  updateUser: updatedUser => axios.put('/api/users', updatedUser, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default UserAPI
