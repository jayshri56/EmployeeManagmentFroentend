import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "../css/Navbar.css";

const MyNavbar = ({ userRole, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Paarsh Infotech</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {!userRole ? (
              <NavDropdown title="Login" id="login-dropdown">
                <NavDropdown.Item as={Link} to="/hr/login">HR Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/login">Admin Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/employee/login">Employee Login</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
