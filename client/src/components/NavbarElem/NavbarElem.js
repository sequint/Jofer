import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/JOFER.png'
import UserAPI from './../../utils/UserAPI'
import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import './NavbarElem.css'
import { drop } from 'lodash'

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

  const dropdownUser = _ => {
    if (IsLoggedIn) {
      return (
        <Dropdown>
          <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&rounded=true`} alt="avatar" className="avatar" />

          <Dropdown.Toggle className="userDropToggle" id="dropdown-split-basic" />

          <Dropdown.Menu className="userDropMenu">
            <Dropdown.Item>{user.first_name} {user.last_name}</Dropdown.Item>
            <Dropdown.Item>{user.user_type}</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
      )
    }
    else {
      return <></>
    }
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
        <Nav>
          <Nav.Link
            className="ms-3 navLink"
            href='/home'>
            Home
          </Nav.Link>
          {isEmployer
            ? (<Nav.Link className="ms-3 navLink" href='/postedjobs'>Posted Jobs</Nav.Link>)
            : (<Nav.Link className="ms-3 navLink" href='/appliedjobs'>Applied Jobs</Nav.Link>)}

          <div className="loggedInContainer">
            {IsLoggedIn
              ? (<Nav.Link className="ms-3 navLink" onClick={handleSignOut} href='/login'>Log Out</Nav.Link>)
              : (<Nav.Link className="ms-3 navLink" href='/login'>Log In</Nav.Link>)}

            {dropdownUser()}
            
            {/* {IsLoggedIn ? <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&rounded=true`} alt="avatar" className="avatar" /> : <></>} */}
          </div>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarElem
