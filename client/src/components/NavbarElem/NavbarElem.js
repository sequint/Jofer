import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/jobrejectorlogo.png'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavbarElem = () => {
 
  const IsLoggedIn = localStorage.getItem("token")
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <img src={logo} alt="" width="70" />
      <Navbar.Brand alt="" href="#home">
        Job Rejector
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Jobs" id="basic-nav-dropdown">
            <NavDropdown.Item href="/appliedjobs">
              Applied Jobs
            </NavDropdown.Item>
            <NavDropdown.Item href="/postedjobs">Posted Jobs</NavDropdown.Item>
          </NavDropdown>
          {IsLoggedIn ? (
            <Nav.Link onClick={handleSignOut} href="/login">
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">Log In</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarElem
