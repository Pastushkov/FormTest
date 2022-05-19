import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.match(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
        );
        fieldValidationErrors.password = passwordValid ? "" : " is incorrect";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        {Object.keys(this.state.formErrors).map((fieldName, i) => {
          if (this.state.formErrors[fieldName].length > 0) {
            return (
              <p key={i}>
                {fieldName} {this.state.formErrors[fieldName]}
              </p>
            );
          } else {
            return "";
          }
        })}

        <form className="form">
          <h2>Sign up</h2>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={`form-control  ${
                this.state.formErrors.email ? "error" : ""
              }`}
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className={`form-control  ${
                this.state.formErrors.password ? "error" : ""
              }`}
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.state.formValid}
          >
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default App;
