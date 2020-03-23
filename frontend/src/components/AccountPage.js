import React, { Component } from "react";
import classes from "./AccountPage.module.css";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import history from "../routing/History";
import Badge from "react-bootstrap/Badge";
// import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

import { HOME_PATH, LOGIN_PATH, RESET_NAME_PATH } from "../constants/Constants";
import { LOGOUT_URL } from "../constants/Constants";
import { USER_INFO_URL } from "../constants/Constants";
import { RESET_EMAIL_PATH } from "../constants/Constants";
import { RESET_USERNAME_PATH } from "../constants/Constants";
import { RESET_PASSWORD_PATH } from "../constants/Constants";
import {
  DarkModeContext,
  DarkModeProvider,
  useDarkModeState,
  useDarkModeToggle
} from "../contexts/DarkModeContext";

import { SketchPicker } from "react-color";

/*
 * Code Snippets borrowed From:
 *
 * https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
 */
export default class AccountPage extends Component {
  // Changing these Variables will change the entire page

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      primaryColor: "#FFFFFF",
      secondaryColor: "#FFFFFF",
      isPrimaryPickerHidden: true,
      isSecondaryPickerHidden: true
    };

    this.handlePrimaryChangeComplete = this.handlePrimaryChangeComplete.bind(
      this
    );
    this.handleSecondaryChangeComplete = this.handleSecondaryChangeComplete.bind(
      this
    );
  }

  callUserInfo = async () => {
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      withCredentials: true
      // credentials: 'same-origin'
    });
    // console.log(response)
    var body = await response.json();
    // console.log(body)
    this.setState({
      username: body.username,
      email: body.email,
      name: body.name
    });
    // this.state.user = body.user.username
  };

  handlePrimaryChangeComplete = color => {
    this.setState({ primaryColor: color.hex });
  };

  handleSecondaryChangeComplete = color => {
    this.setState({ secondaryColor: color.hex });
  };

  handleLogout(event) {
    event.preventDefault();
    // console.log(LOGOUT_URL)
    fetch(LOGOUT_URL, {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
      .then(response => {
        // console.log(response)
        if (response.status == 200) {
          history.push(HOME_PATH);
        } else {
          console.log("Unable to Log Out");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = async () => {
    // console.log("TEST")
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      withCredentials: true
      // credentials: 'same-origin'
    });
    // console.log(response)
    if (response.status != 200) {
      history.push(LOGIN_PATH);
    } else {
      this.callUserInfo().catch(err => {
        console.log(err);
      });
    }
  };

  render() {
    const popover = (
      <Popover>
        <Popover.Title as="h3">Currently Unavailable</Popover.Title>
        <Popover.Content>
          Unfortunately, you can't change your username at this time. We
          apologize for the inconvenience.
        </Popover.Content>
      </Popover>
    );

    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <div className={classes.wrapper}>
            <Image
              src={require("../assets/img/slothlogo.png")}
              style={{ width: "10rem" }}
              fluid
              roundedCircle
            />
          </div>
          <div>
            <Card className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
              <Card.Header>Your Account</Card.Header>
              <Card.Body>
                <Card.Title>
                  Welcome Back, <b>{this.state.name}</b>&nbsp;&nbsp;
                  <Badge
                    variant="success"
                    onClick={() => history.push(RESET_NAME_PATH)}
                  >
                    Update Name
                  </Badge>
                </Card.Title>
                <Card.Subtitle>
                  Manage your Info, Privacy, and Security settings to make{" "}
                  <b>FINEX</b> yours.
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
          <br />
          <div>
            <Card className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
              <Card.Header>Personal Information</Card.Header>
              <Card.Body>
                <div>
                  Username: <b>{this.state.username}</b>&nbsp;&nbsp;
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={popover}
                  >
                    <Badge variant="success">Update Username</Badge>
                  </OverlayTrigger>
                </div>
                <div>
                  Email: <b>{this.state.email}</b>&nbsp;&nbsp;
                  <Badge
                    variant="success"
                    onClick={() => history.push(RESET_EMAIL_PATH)}
                  >
                    Update Email
                  </Badge>
                </div>
                <div>
                  Password: <b>{this.state.password}</b>
                  <Badge
                    variant="success"
                    onClick={() => history.push(RESET_PASSWORD_PATH)}
                  >
                    Change Password
                  </Badge>
                </div>
                <div>
                  Current Primary Color:<b>{this.state.primaryColor}</b>
                  <Badge
                    variant="success"
                    onClick={() =>
                      this.setState({ isPrimaryPickerHidden: false })
                    }
                  >
                    Change Primary Color
                  </Badge>
                  <div hidden={this.state.isPrimaryPickerHidden}>
                    <SketchPicker
                      color={this.state.primaryColor}
                      onChangeComplete={this.handlePrimaryChangeComplete}
                    />
                    <Badge
                      variant="success"
                      onClick={() =>
                        this.setState({ isPrimaryPickerHidden: true })
                      }
                    >
                      Confirm
                    </Badge>
                  </div>
                  <div>
                    Current Secondary Color:<b>{this.state.secondaryColor}</b>
                    <Badge
                      variant="success"
                      onClick={() =>
                        this.setState({ isSecondaryPickerHidden: false })
                      }
                    >
                      Change Secondary Color
                    </Badge>
                    <div hidden={this.state.isSecondaryPickerHidden}>
                      <SketchPicker
                        color={this.state.secondaryColor}
                        onChangeComplete={this.handleSecondaryChangeComplete}
                      />
                      <Badge
                        variant="success"
                        onClick={() =>
                          this.setState({ isSecondaryPickerHidden: true })
                        }
                      >
                        Confirm
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <br />
          <div className={classes.wrapper}>
            <Button variant="danger" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AccountPage.contextType = DarkModeContext;
