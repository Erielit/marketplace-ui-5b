import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import { LoginScreen } from "../auth/LoginScreen";
import { HomeScreen } from "../home/HomeScreen";
import { CategoryScreen } from "../category/CategoryScreen";
import { SubcategoryScreen } from "../subcategory/SubcategoryScreen";
import { PublicNavBar } from "../../shared/components/PublicNavBar";
import { ContactScreen } from "../contact/ContactScreen";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="*"
          element={
            !user.logged ? (
              <>
                {/*NavBar publico*/}
                <PublicNavBar />
                <Container>
                  <Routes>
                    <Route path={"/home"} element={<HomeScreen />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path={"/"} element={<HomeScreen />} />
                    <Route path="*" element={<div>Error 404</div>} />
                  </Routes>
                </Container>
              </>
            ) : (
              <>
                <Navbar bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand href="#">
                      <FeatherIcon icon="home" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                      <Link to={"/"} className="nav-link">
                        Categorías
                      </Link>
                      <Link to={"/subcategory"} className="nav-link">
                        Subcategorías
                      </Link>
                    </Nav>
                  </Container>
                </Navbar>
                <Container>
                  <Routes>
                    <Route path={"/"} element={<CategoryScreen />} />
                    <Route
                      path="/subcategory"
                      element={<SubcategoryScreen />}
                    />
                  </Routes>
                </Container>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};
