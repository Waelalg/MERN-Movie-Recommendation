import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><img
          src="/logo.png"
          alt="Logo"
          style={{ height: '30px' }} 
        /></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fa-solid fa-home"></i>&nbsp; Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/overview">
              <Nav.Link>
                <i className="fa-solid fa-clipboard-question"></i>&nbsp; Project Details
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://github.com/Waelalg/MERN-Movie-Recommendation" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>&nbsp; Project Code
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/Waelalg" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>&nbsp; Github
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/wael-alg/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;