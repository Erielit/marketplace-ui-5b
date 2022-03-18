import { Button } from "bootstrap";
import React, { useContext } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/auth/authContext";
import img from "../../assets/img/marketplace.png";

export const PrivateNavBar = () => {
  const { dispatch } = useContext(AuthContext);
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
            Categorías
          </Link>
          <Link to={"/subcategory"} className="nav-link">
            Subcategorías
          </Link>
          <Link to={"/products"} className="nav-link">
            Productos
          </Link>
        </Nav>
        <Button
          variant="outline-light"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Cerrar sesión
        </Button>
      </Container>
    </Navbar>
  );
};
