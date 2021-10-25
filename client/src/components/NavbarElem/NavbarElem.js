import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/JOFER.png'
import UserAPI from './../../utils/UserAPI'
import { useState, useEffect } from 'react'
import './NavbarElem.css'

const NavbarElem = () => {
  const [user, setUser] = useState({})
  const [isEmployer, setIsEmployer] = useState()
  const IsLoggedIn = localStorage.getItem('token')
  useEffect(() => {

    UserAPI.getUser().then(({ data }) => {
      console.log(data)
      setUser(data)
      if (data.user_type === 'applicant') {
        setIsEmployer(false)
      } else {
        setIsEmployer(true)
      }
    })
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    window.loation = '/login'
  }

  return (
    <Navbar
      className="Nav"
      variant='dark'
      expand='lg'>
      <img
        className="ms-2"
        src={logo} alt=''
        width='70' />
      <Navbar.Brand
        className="ms-3"
        alt=''
        href='/home'>
        Jofer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link
            className="ms-3 navLink"
            href='/home'>
            Home
          </Nav.Link>
          {isEmployer
            ? (<Nav.Link className="ms-3 navLink" href='/postedjobs'>Posted Jobs</Nav.Link>)
            : (<Nav.Link className="ms-3 navLink" href='/appliedjobs'>Applied Jobs</Nav.Link>)}

          {IsLoggedIn
            ? (<Nav.Link className="ms-3 navLink" onClick={handleSignOut} href='/login'>Log Out</Nav.Link>)
            : (<Nav.Link className="ms-3 navLink" href='/login'>Log In</Nav.Link>)}
          
          {IsLoggedIn ? <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&rounded=true`} alt="avatar" className="avatar" /> : <></>}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarElem
