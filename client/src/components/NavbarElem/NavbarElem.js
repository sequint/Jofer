import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/jobrejectorlogo.png'
import NavDropdown from 'react-bootstrap/NavDropdown'
const NavbarElem = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <img src={logo} alt='' width='70' />
      <Navbar.Brand alt='' href='#home'>
        Job Rejector
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <NavDropdown title='Jobs' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/appliedjobs'>
              Applied Jobs
            </NavDropdown.Item>
            <NavDropdown.Item href='/declinedjobs'>
              Declined Jobs
            </NavDropdown.Item>
            <NavDropdown.Item href='/managejobs'>Manage Jobs</NavDropdown.Item>
            <NavDropdown.Item href='/postedjobs'>Posted Jobs</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarElem
