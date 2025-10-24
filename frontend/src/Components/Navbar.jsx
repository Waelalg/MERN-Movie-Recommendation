import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ fontWeight: "bold", fontSize: "1.5rem" }}>🎬 MovieFinder</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="https://github.com/Waelalg/MERN-Movie-Recommendation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>&nbsp; GitHub
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/wael-alg/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
