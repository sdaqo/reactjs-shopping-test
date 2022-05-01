import React, { Component } from "react";
import { withAlert } from "react-alert";
import { sha256 } from "hash.js";

class SignIn extends Component {
  state = {
    isChecked: false,
    input_type: "password",
    emailValid: false,
    pwdValid: false,
    pwdRepeatValid: false,
    emailNotValidText: "",
    pwdNotValidText: "",
    pwd: "",
    pwdRepeatText: <></>,
    errorText: "",
  };

  render() {
    return (
      <>
        <div className="card-header bg-transparent border-primary text-center fs-3">
          Sign In
        </div>
        <div className="container mb-3 mt-3">
          <form className="text-white" onSubmit={this.handelSubmitEvent}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="InputEmail"
                autoComplete="username"
                aria-describedby="emailHelp"
                onChange={this.validateEmail}
              />
              <label className="text-danger form-label">
                {this.state.emailNotValidText}
                {this.state.errorText}
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={this.state.input_type}
                name="password"
                className="form-control"
                id="InputPassword"
                autoComplete="new-password"
                onChange={this.validatePassword}
              />
              <label className="text-danger form-label">
                {this.state.pwdNotValidText}
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">Repeat Password</label>
              <input
                type={this.state.input_type}
                name="password"
                className="form-control"
                id="InputRepeatPassword"
                autoComplete="new-password"
                onChange={this.validateRepeatPw}
              />

              {this.state.pwdRepeatText}
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={this.state.isChecked}
                onChange={this.handleCheckbox}
              />

              <label className="form-check-label">Show Password</label>
            </div>
            <button
              disabled={this.handleBtnDisable()}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={this.props.onClose}
            >
              Close
            </button>
            <span className="ms-3">
              Already have an account?{" "}
              <span
                className="link-primary"
                onClick={this.props.onCompSwitch}
                style={{ cursor: "pointer" }}
              >
                Log In
              </span>
            </span>
          </form>
        </div>
      </>
    );
  }

  handleBtnDisable() {
    const { emailValid, pwdValid, pwdRepeatValid } = this.state;

    if (emailValid && pwdValid && pwdRepeatValid) {
      return false;
    }

    return true;
  }

  handleCheckbox = () => {
    if (this.state.isChecked === true) {
      this.setState({ isChecked: false, input_type: "password" });
    } else {
      this.setState({ isChecked: true, input_type: "text" });
    }
  };

  validateEmail = (event) => {
    const value = event.target.value;
    var emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailRegex.test(value)) {
      this.setState({
        emailValid: false,
        emailNotValidText: "Email not Valid",
      });
      return null;
    }

    this.setState({
      emailValid: true,
      emailNotValidText: "",
    });
  };

  validatePassword = (event) => {
    const pwd = event.target.value;
    if (pwd.length >= 8) {
      this.setState({ pwdValid: true, pwdNotValidText: "", pwd: pwd });
      return null;
    }

    this.setState({
      pwdValid: false,
      pwd: pwd,
      pwdNotValidText: "The Password must be 8 charachters or longer.",
    });
  };

  validateRepeatPw = (event) => {
    const pwd = event.target.value;

    if (pwd !== this.state.pwd) {
      this.setState({
        pwdRepeatValid: false,
        pwdRepeatText: (
          <label className="text-danger form-label">
            The Passwords don't Match
          </label>
        ),
      });
      return null;
    }

    this.setState({
      pwdRepeatValid: true,
      pwdRepeatText: (
        <label className="text-success form-label">The Passwords Match</label>
      ),
    });
  };

  handelSubmitEvent = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pwd = this.state.pwd;
    const pwd_hash = sha256().update(pwd).digest("hex");
    const url = `${window.config.api}/signin?email=${email}&pwdHash=${pwd_hash}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => this.handleSignIn(data));
  };

  handleSignIn(response) {
    if (response.status === "success") {
      this.props.onClose();
      this.props.alert.success("Signed In!");
    } else {
      this.setState({ errorText: "This Account already exsists" });
    }
  }
}

export default withAlert()(SignIn);
