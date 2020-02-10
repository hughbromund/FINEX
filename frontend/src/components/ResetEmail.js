import React, { Component } from "react";

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = "http://httpbin.org/post";
    if (!this.validateEmail(this.state.email)) {
      return;
    }
    alert(this.state.email);
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

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Reset Email</label>
          <br />
          <input value={this.state.email} onChange={this.handleChange}></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
