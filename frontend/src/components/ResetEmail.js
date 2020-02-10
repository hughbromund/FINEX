import React, { Component } from "react";

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = "http://httpbin.org/post";
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: "You have entered an invalid email!"
      });
      return;
    }
    this.setState({
      error: "Success!"
    });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state.email),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json)
      .then(res => console.log("Success"))
      .catch(err => console.log(err));
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Reset Email</label>
          <br />
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
          ></input>
          <br />
          <button type="submit">Submit</button>
          <br />
          <label>{this.state.error}</label>
        </form>
      </div>
    );
  }
}
