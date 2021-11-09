import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../image/JOFER.png'

const LPnav = () => {
  return (
    <>
      <Navbar
        className="Nav"
        variant="dark"
        expand="lg">
        <div className="container px-5">
          <img
            src={logo}
            alt="Jofer Logo"
            width="70px" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>

              <Nav.Link
                className="navLink"
                href="/home">
                Home
              </Nav.Link>

              <Nav.Link
                className="navLink"
                href="#about">
                About
              </Nav.Link>

              <Nav.Link
                className="navLink"
                href="#team">
                Team
              </Nav.Link>

              <Nav.Link
                className="navLink"
                href="#contact">
                Contact
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  )
}

export default LPnav