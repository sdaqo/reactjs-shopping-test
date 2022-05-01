import React, { Component } from "react";
import { withAlert } from "react-alert";
import { sha256 } from "hash.js";

class Login extends Component {
  state = {
    isChecked: false,
    input_type: "password",
    notValidText: "",
  };

  render() {
    return (
      <>
        <div className="card-header bg-transparent border-primary text-center fs-3">
          Log In
        </div>
        <div className="container mb-3 mt-3">
          <form className="text-white" onSubmit={this.handelSubmitEvent}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                autoComplete="username"
                aria-describedby="emailHelp"
                placeholder="Email address"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={this.state.input_type}
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                autoComplete="current-password"
                placeholder="Password"
                required
              />
              <label className="text-danger form-label">
                {this.state.notValidText}
              </label>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={this.props.onClose}
            >
              Close
            </button>
            <span className="ms-3">
              No Account?{" "}
              <span
                className="link-primary"
                onClick={this.props.onCompSwitch}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </span>
          </form>
        </div>
      </>
    );
  }

  handleCheckbox = () => {
    if (this.state.isChecked === true) {
      this.setState({ isChecked: false, input_type: "password" });
    } else {
      this.setState({ isChecked: true, input_type: "text" });
    }
  };

  email = "";
  pwdHash = "";

  handelSubmitEvent = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pwd = event.target.password.value;
    if (email.length < 1 || pwd.length < 1) {
      this.setState({ notValidText: `Fields can't be empty` });
      return null;
    }

    const pwd_hash = sha256().update(pwd).digest("hex");
    const url = `${window.config.api}/login?email=${email}&pwdHash=${pwd_hash}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => this.handlelogIn(data, email, pwd_hash));
  };

  handlelogIn(response, email, pwdHash) {
    if (response.status === "fail") {
      this.setState({
        notValidText: `Your ${response.fail_reason} is Invalid`,
      });
    } else {
      this.props.onClose();
      this.props.alert.success("Loged In!");

      this.props.onLogin(response.data, email, pwdHash, response.session);
    }
  }
}

export default withAlert()(Login);
