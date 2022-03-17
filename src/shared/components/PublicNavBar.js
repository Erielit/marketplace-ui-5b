import React from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/marketplace.png";

export const PublicNavBar = () => {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation("/auth");
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image
            src={img}
            className="ms-5"
            style={{ width: 20, height: "auto" }}
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link to={"/"} className="nav-link">
            Productos
          </Link>
          <Link to={"/contact"} className="nav-link">
            Contacto
          </Link>
        </Nav>
        <Button variant="outline-light" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </Container>
    </Navbar>
  );
};
