import React, { Component } from "react";
import {
  LOGIN_PATH,
  USER_INFO_URL,
  GET_PORTFOLIO_URL,
  CREATE_PORTFOLIO_URL,
} from "../../constants/Constants";
import history from "../../routing/History";
import { Jumbotron, Button } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import classes from "./StocksPage.module.css";

class StocksPage extends Component {
  state = {
    isLoggedIn: null,
    portfolio: null,
  };

  componentDidMount = () => {
    this.callAuthAPI().catch((err) => {
      console.log(err);
    });

    this.getPortfolio().catch((err) => {
      console.log(err);
    });
  };

  /**
   * Checks to make sure the client trying to access
   * the page is a logged in user.
   */
  callAuthAPI = async () => {
    console.log(USER_INFO_URL);
    let response;
    response = await fetch(USER_INFO_URL);
    // const body = await response.json();
    // console.log(body.status);

    if (response.status !== 200) {
      // console.log("false");
      this.setState({ isLoggedIn: false });
    } else {
      // console.log("true");
      this.setState({ isLoggedIn: true });
    }
  };

  /**
   * Get the portfolio information
   * via a backend call.
   */
  getPortfolio = async () => {
    console.log(GET_PORTFOLIO_URL);
    let response;
    response = await fetch(GET_PORTFOLIO_URL);
    const body = await response.json();
    console.log(body);

    if (response.status == 200) {
      // console.log("false");
      this.setState({ portfolio: body });
    }
  };

  createPortfolio = async () => {
    fetch(CREATE_PORTFOLIO_URL, {
      method: "POST",
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ good_color: newGoodColor }),
    });

    let defaultPortfolio = {
      status: 200,
      wallet: 4000,
      investing: 1000,
      stocks: [],
    };

    this.setState({ portfolio: defaultPortfolio });
  };

  render() {
    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else if (this.state.isLoggedIn == null) {
      return <h1>Loading...</h1>;
    } else if (this.state.portfolio == null) {
      return (
        <div className={classes.jumboWrapper}>
          <Jumbotron
            className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
          >
            <h1>No Portfolio Found</h1>
            <p>
              It seems you haven't made a portfolio as of yet, click the button
              below to create a simulated portfolio. Start with $5000 and try
              and make as much as you can!
            </p>
            <Button variant="success" onClick={this.createPortfolio}>
              Create Portfolio
            </Button>
          </Jumbotron>
        </div>
      );
    }

    return <div></div>;
  }
}

StocksPage.contextType = DarkModeContext;
export default StocksPage;
