import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./loginModal";

class NavBar extends Component {
  state = {
    modalShow: true,
    modal: "",
    buttonPos1: "",
    buttonPos2: "",
    activeClassName: "",
  };

  render() {
    const { countOfItems } = this.props;
    return (
      <Navbar
        className="border-bottom border-primary shadow"
        variant="dark"
        bg="dark"
        expand="lg"
        style={{ width: "100%" }}
      >
        <div className="container-xxl">
          <Link className="navbar-brand" to="/">
            The App
          </Link>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/products">
                Products
              </Link>
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  transform="grow-5"
                  alt="Cart"
                />{" "}
                {countOfItems}
              </Link>
            </Nav>
          </Navbar.Collapse>
          <div>
            <button
              className="btn btn-primary shadow justify-content-center"
              onClick={this.handleLogInShow}
            >
              <FontAwesomeIcon
                icon={this.getIcon()}
                style={{ color: "white" }}
                transform="grow-6"
              />
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-dark ${this.state.activeClassName}`}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    this.setState({ activeClassName: "" });
                    this.props.onLogOut();
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        {this.state.modal}
      </Navbar>
    );
  }

  handleLogInShow = () => {
    if (this.props.loggedIn !== true) {
      this.setState({
        modal: (
          <LoginModal
            onClose={this.handleLogInClose}
            onLogin={this.props.onLogin}
            modalShow={this.state.modalShow}
          />
        ),
      });
    } else {
      if (this.state.activeClassName === "show") {
        this.setState({ activeClassName: "" });
        return null;
      }
      this.setState({ activeClassName: "show" });
    }
  };

  handleLogInClose = () => {
    this.setState({ modal: "" });
  };

  getIcon() {
    if (this.props.loggedIn === true) {
      return faUser;
    }
    return faRightToBracket;
  }
}

export default NavBar;
