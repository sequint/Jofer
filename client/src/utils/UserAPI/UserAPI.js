import axios from 'axios'

// Create api object for user CRUD routes.
const UserAPI = {
  getUserAtSignIn: _ => axios.get('/api/user/signin'),
  // Create property that get individual user.
  getUser: _ => axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  // Create property that uses axios request to register a user.
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user)
}

export default UserAPI
