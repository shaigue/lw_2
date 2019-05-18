import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MTurkID: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.MTurkID.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="MTurkID" bsSize="large">
            <ControlLabel>MTurkID</ControlLabel>
            <FormControl
              autoFocus
              type="MTurkID"
              value={this.state.MTurkID}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Study password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="Study password"
            />
          </FormGroup>
          <Link to="/Videos_demo">
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}
