import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <Navbar
    bg="dark"
    expand="lg"
    variant="dark"
    className="justify-content-between"
  >
    <Navbar.Brand style={isActive(history, "/")} href="/">
      Second Hand
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="mr-auto my-2 my-lg-0"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link style={isActive(history, "/shop")} href="/shop">
          Shop
        </Nav.Link>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Nav.Link
            style={isActive(history, "/user/dashboard")}
            href="/user/dashboard"
          >
            Dashboard
          </Nav.Link>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Nav.Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            href="/admin/dashboard"
          >
            Dashboard
          </Nav.Link>
        )}
      </Nav>

      <Nav>
        <Nav.Link style={isActive(history, "/cart")} href="/cart">
          Cart{" "}
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Nav.Link>
        {!isAuthenticated() && (
          <Fragment>
            <Nav.Link style={isActive(history, "/signin")} href="/signin">
              Signin
            </Nav.Link>

            <Nav.Link style={isActive(history, "/signup")} href="/signup">
              Signup
            </Nav.Link>
          </Fragment>
        )}
        {isAuthenticated() && (
          <Nav.Link
            className="nav-link"
            style={{ color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default withRouter(Menu);