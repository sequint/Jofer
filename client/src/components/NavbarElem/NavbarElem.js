import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/JOFER.png'
import UserAPI from './../../utils/UserAPI'
import { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import './NavbarElem.css'


const NavbarElem = () => {
  const [user, setUser] = useState({})
  const [isEmployer, setIsEmployer] = useState()
  const IsLoggedIn = localStorage.getItem('token')
  useEffect(() => {

    UserAPI.getUser().then(({ data }) => {
      console.log(data)
      setUser(data)
      if (data.user_type === 'Applicant') {
        setIsEmployer(false)
      } else {
        setIsEmployer(true)
      }
    })
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    window.location = '/'
  }

  const dropdownUser = _ => {
    if (IsLoggedIn) {
      return (
        
          
            
            <Dropdown
              align="end">
              <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&rounded=true`} alt="avatar" className="mt-2 avatar" />

              <Dropdown.Toggle className="userDropToggle" id="dropdown-split-basic" />

              <Dropdown.Menu

                className="userDropMenu me-5">
                <Dropdown.Header>{user.first_name} {user.last_name}</Dropdown.Header>
                <Dropdown.Header>{user.user_type}</Dropdown.Header>
                <Dropdown.Divider/>
                <Dropdown.Item
                  href='/login'
                  onClick={handleSignOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        
       
      )
    }
    else {
      return <><Nav.Link className="ms-3 navLink" href='/login'>Log In</Nav.Link></>
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

          {dropdownUser()}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarElem
