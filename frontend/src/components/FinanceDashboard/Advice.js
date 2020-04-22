import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import history from "../../routing/History";

import {
  GET_FINANCE_ADVICE,
  CREATE_NEW_BUDGET,
} from "../../constants/Constants";

export default class Advice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null,
      hasAdvice: false,
    };
  }

  componentDidMount() {
    this.getAdvice();
  }

  getAdvice = async () => {
    var response = await fetch(GET_FINANCE_ADVICE, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      // credentials: 'same-origin'
    }).catch((err) => {
      console.error(err);
    });

    var body = await response.json();

    console.log(body);

    if (response.status === 400) {
      this.setState({ hasAdvice: false, advice: body });
      return;
    }

    this.setState({ advice: body, hasAdvice: true });
  };

  render() {
    var advices = [];

    if (
      this.state.hasAdvice === true &&
      this.state.advice !== null &&
      this.state.advice !== undefined
    ) {
      var index = 0;
      this.state.advice.forEach((element) => {
        index = index + 1;
        console.log(element);
        var budgetButton = [];
        if (element.isBudget === true) {
          budgetButton.push(
            <div>
              <hr />
              <Button
                variant="outline-warning"
                onClick={() => history.push(CREATE_NEW_BUDGET)}
              >
                Update Budget
              </Button>
            </div>
          );
        } else {
          budgetButton.push(<div></div>);
        }

        advices.push(
          <div key={index}>
            <Alert variant="warning">
              <Alert.Heading>
                <b>{element.trigger}</b>
              </Alert.Heading>
              <p>{element.advice}</p>
              {budgetButton}
            </Alert>
          </div>
        );
      });
      //console.log(advices.length);
      if (advices.length === 0) {
        // There was no Advice Returned
        advices.push(
          <div key={1}>
            <Alert variant="success">
              <Alert.Heading>Your financial health is Good!</Alert.Heading>
              <p>
                <b>FINEX</b> has no advice for you right now.
              </p>
              <p>
                Keep it up! Your finances are in good shape. Keep tracking your
                spending in <b>FINEX</b> to receive more detailed advice!
              </p>
            </Alert>
          </div>
        );
      }

      return <div>{advices}</div>;
    } else {
      // If they don't have any advice
      return (
        <div>
          <Alert variant="warning">
            <Alert.Heading>No Advice Available</Alert.Heading>
            <p>
              There is no advice available for your account. If you haven't made
              a budget yet, please do that for the current month. If this
              problem continues, try restarting your browser or logging in and
              logging out.
            </p>
            <hr />
            <Button
              variant="outline-warning"
              onClick={() => history.push(CREATE_NEW_BUDGET)}
            >
              Create New Budget
            </Button>
          </Alert>
        </div>
      );
    }
  }
}
