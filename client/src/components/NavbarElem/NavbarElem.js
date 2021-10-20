import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/jobrejectorlogo.png'
import UserAPI from './../../utils/UserAPI'

const IsLoggedIn = localStorage.getItem('token')
let isEmployer

const handleSignOut = () => {
  localStorage.removeItem('token')
  window.loation = '/login'
}

UserAPI.getUser().then(({ data: { user_type } }) => {
  console.log(user_type)
  if (user_type === 'applicant') {
    isEmployer = false
  } else {
    isEmployer = true
  }
})

const NavbarElem = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <img src={logo} alt='' width='70' />
      <Navbar.Brand alt='' href='/home'>
        Job Rejector
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='/home'>Home</Nav.Link>
          {isEmployer
            ? (
              <Nav.Link href='/postedjobs'>Posted Jobs</Nav.Link>
              )
              : (
              <Nav.Link href='/appliedjobs'>Applied Jobs</Nav.Link>
              )}
          {IsLoggedIn
            ? (
              <Nav.Link onClick={handleSignOut} href='/login'>
                Log Out
              </Nav.Link>
              )
            : (
              <Nav.Link href='/login'>Log In</Nav.Link>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarElem
