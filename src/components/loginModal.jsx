import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Login from "./login";
import SignIn from "./signIn";

class LoginModal extends Component {
  handleSwitch = () => {
    if (this.state.currentComponent === this.logInComponent) {
      this.setState({ currentComponent: this.signInComponent });
    } else {
      this.setState({ currentComponent: this.logInComponent });
    }
  };

  logInComponent = (
    <Login
      onClose={this.props.onClose}
      onLogin={this.props.onLogin}
      onCompSwitch={this.handleSwitch}
    />
  );

  signInComponent = (
    <SignIn onClose={this.props.onClose} onCompSwitch={this.handleSwitch} />
  );

  state = {
    //modalShow: false,
    currentComponent: this.logInComponent,
  };

  constructor(props) {
    super(props);

    switch (this.props.modalComponent) {
      case "signin":
        this.state.currentComponent = this.signInComponent;
        break;

      case "login":
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Modal
          className="text-white"
          show={this.props.modalShow}
          onHide={this.props.onClose}
          centered
        >
          <Modal.Body className="bg-dark">
            {this.state.currentComponent}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default LoginModal;
