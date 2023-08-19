import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Login } from "./Login";
import { useGlobalState } from "../context/GlobalState";

export interface ITopBarProps {}

export function TopBar(props: ITopBarProps) {
  const {
    state: { isLoggedIn },
  } = useGlobalState();

  function renderLoggedInItems() {
    if (isLoggedIn) {
      return (
        <>
          <NavLink to="/operations" className="nav-link">
            Operation
          </NavLink>
          <NavLink to="/history" className="nav-link">
            History
          </NavLink>
        </>
      );
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Arithmetics</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {renderLoggedInItems()}
          </Nav>
          <Login />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
