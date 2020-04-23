import React, { Component } from "react";
import classes from "./AccountPage.module.css";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
// import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import history from "../../routing/History";
import Badge from "react-bootstrap/Badge";
// import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

import {
  HOME_PATH,
  LOGIN_PATH,
  RESET_NAME_PATH,
  GREEN_COLOR_HEX,
  RED_COLOR_HEX,
  BLUE_COLOR_HEX,
  YELLOW_COLOR_HEX,
} from "../../constants/Constants";

import {
  LOGOUT_URL,
  USER_INFO_URL,
  GET_BAD_COLOR,
  GET_GOOD_COLOR,
  UPDATE_BAD_COLOR,
  UPDATE_GOOD_COLOR,
  RESET_EMAIL_PATH,
  RESET_PASSWORD_PATH,
  RESET_PROFILE_PICTURE_PATH,
  GET_PROFILE_IMAGE,
} from "../../constants/Constants";

import {
  DarkModeContext,
  useDarkModeState,
  useDarkModeToggle,
} from "../../contexts/DarkModeContext";

// Imports for dark mode toggle
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

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
      primaryColor: "",
      secondaryColor: "",
      isPrimaryPickerHidden: true,
      isSecondaryPickerHidden: true,
      profilePicURL: "",
    };

    this.handlePrimaryChangeComplete = this.handlePrimaryChangeComplete.bind(
      this
    );
    this.handleSecondaryChangeComplete = this.handleSecondaryChangeComplete.bind(
      this
    );
  }

  callUserInfo = async () => {
    // ("MADE IT TO CALL USER INFO");
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      // credentials: 'same-origin'
    });
    // console.log(response)
    var body = await response.json();
    //console.log(body);
    this.setState({
      username: body.username,
      email: body.email,
      name: body.name,
    });
    // this.state.user = body.user.username
  };

  handlePrimaryChangeComplete = (color) => {
    this.setState({ primaryColor: color.hex });
    // console.log(JSON.stringify({ good_color: this.state.primaryColor }));
    this.updateGoodColor(color.hex);
  };

  updateGoodColor = (newGoodColor) => {
    fetch(UPDATE_GOOD_COLOR, {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ good_color: newGoodColor }),
    });
  };

  handleSecondaryChangeComplete = (color) => {
    this.setState({ secondaryColor: color.hex });
    this.updateBadColor(color.hex);
  };

  updateBadColor = (newBadColor) => {
    fetch(UPDATE_BAD_COLOR, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bad_color: newBadColor }),
    });
  };

  handleLogout(event) {
    event.preventDefault();
    // console.log(LOGOUT_URL)
    fetch(LOGOUT_URL, {
      method: "POST",
      // mode: 'no-cors',
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          history.push(HOME_PATH);
        } else {
          console.log("Unable to Log Out");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount = async () => {
    // console.log("TEST")
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
    });
    // console.log(response)
    if (response.status === 200 || response.status === 304) {
      this.callUserInfo().catch((err) => {
        console.log(err);
      });
    } else {
      history.push(LOGIN_PATH);
    }

    response = await fetch(GET_GOOD_COLOR, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
    const goodColorBody = await response.json();

    response = await fetch(GET_BAD_COLOR, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
    const badColorBody = await response.json();

    this.setState({
      primaryColor: goodColorBody.good_color,
      secondaryColor: badColorBody.bad_color,
    });

    var response = await fetch(GET_PROFILE_IMAGE, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });

    var body = await response.json();
    console.log(body);

    this.setState({ profilePicURL: body });
  };

  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <div className={classes.inner}>
          <div
            className={
              this.context.isDarkMode
                ? classes.wrapperDark
                : classes.wrapperLight
            }
          >
            <Image
              rounded
              src={this.state.profilePicURL}
              style={{ width: "10rem" }}
            />
          </div>
          <div>
            <Card className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
              <Card.Header>Your Account</Card.Header>
              <Card.Body>
                <Card.Title>
                  Welcome Back, <b>{this.state.name}</b>
                  <span style={{ float: "right" }}>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => history.push(RESET_NAME_PATH)}
                    >
                      Update Name
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => history.push(RESET_PROFILE_PICTURE_PATH)}
                    >
                      Update Profile Picture
                    </Button>
                  </span>
                </Card.Title>
                <Card.Subtitle>
                  <br />
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
                </div>
                <hr />
                <div>
                  Email: <b>{this.state.email}</b>&nbsp;&nbsp;
                  <span style={{ float: "right" }}>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => history.push(RESET_EMAIL_PATH)}
                    >
                      Update Email
                    </Button>
                  </span>
                </div>
                <hr />
                <div>
                  Password: <b>{this.state.password}</b>
                  <span style={{ float: "right" }}>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => history.push(RESET_PASSWORD_PATH)}
                    >
                      Change Password
                    </Button>
                  </span>
                </div>
                <hr />
                <div>
                  Current Primary Color:<b>{this.state.primaryColor}</b>
                  <span style={{ float: "right" }}>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() =>
                        this.setState({ isPrimaryPickerHidden: false })
                      }
                    >
                      Change Primary Color
                    </Button>
                  </span>
                  <div hidden={this.state.isPrimaryPickerHidden}>
                    <SketchPicker
                      color={this.state.primaryColor}
                      onChangeComplete={this.handlePrimaryChangeComplete}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() =>
                        this.setState({ isPrimaryPickerHidden: true })
                      }
                    >
                      Close
                    </Button>
                  </div>
                  <hr />
                  <div>
                    Current Secondary Color:<b>{this.state.secondaryColor}</b>
                    <span style={{ float: "right" }}>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          this.setState({ isSecondaryPickerHidden: false })
                        }
                      >
                        Change Secondary Color
                      </Button>
                    </span>
                    <div hidden={this.state.isSecondaryPickerHidden}>
                      <SketchPicker
                        color={this.state.secondaryColor}
                        onChangeComplete={this.handleSecondaryChangeComplete}
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          this.setState({ isSecondaryPickerHidden: true })
                        }
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  Light/Dark Mode Toggle:
                  <span style={{ float: "right" }}>
                    <Toggles />
                  </span>
                </div>
                <hr />
                <div>
                  Preset Themes:&nbsp;&nbsp;
                  <br />
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      this.setState({
                        primaryColor: GREEN_COLOR_HEX,
                        secondaryColor: RED_COLOR_HEX,
                      });
                      this.updateGoodColor(GREEN_COLOR_HEX);
                      this.updateBadColor(RED_COLOR_HEX);
                    }}
                  >
                    Standard
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      this.setState({
                        primaryColor: RED_COLOR_HEX,
                        secondaryColor: GREEN_COLOR_HEX,
                      });
                      this.updateGoodColor(RED_COLOR_HEX);
                      this.updateBadColor(GREEN_COLOR_HEX);
                    }}
                  >
                    Inverse
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      this.setState({
                        primaryColor: BLUE_COLOR_HEX,
                        secondaryColor: YELLOW_COLOR_HEX,
                      });
                      this.updateGoodColor(BLUE_COLOR_HEX);
                      this.updateBadColor(YELLOW_COLOR_HEX);
                    }}
                  >
                    Blue/Yellow (accessibility mode)
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      this.setState({
                        primaryColor: GREEN_COLOR_HEX,
                        secondaryColor: GREEN_COLOR_HEX,
                      });
                      this.updateGoodColor(GREEN_COLOR_HEX);
                      this.updateBadColor(GREEN_COLOR_HEX);
                    }}
                  >
                    Green Only (accessibility mode)
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <br />
          <div
            className={
              this.context.isDarkMode
                ? classes.wrapperDark
                : classes.wrapperLight
            }
          >
            <Button variant="danger" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function Toggles() {
  const toggle = useDarkModeToggle();
  const { isDarkMode } = useDarkModeState();
  return (
    <div className={classes.darkModeToggles}>
      <ButtonToolbar>
        <ToggleButtonGroup name="radio">
          <ToggleButton
            variant="light"
            onClick={() => toggle({ type: "turnOffDarkMode" })}
            value="light"
            type="radio"
            name="radio"
            checked={isDarkMode ? false : true}
            size="sm"
          >
            {" "}
            Light Mode{" "}
          </ToggleButton>
          <ToggleButton
            variant="dark"
            onClick={() => toggle({ type: "turnOnDarkMode" })}
            value="dark"
            type="radio"
            name="radio"
            checked={isDarkMode ? true : false}
            size="sm"
          >
            {" "}
            Dark Mode{" "}
          </ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

AccountPage.contextType = DarkModeContext;
