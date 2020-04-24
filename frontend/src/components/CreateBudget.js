import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BudgetGraph from "./BudgetGraph";
import BudgetAdvice from "./BudgetAdvice";

import classes from "./CreateBudget.module.css";
import { DarkModeContext } from "../contexts/DarkModeContext";

import { FINANCE_DASHBOARD } from "../constants/Constants";
import history from "../routing/History";

import {
  POST_CREATE_BUDGET,
  FINANCE_DASHBOARD,
  GET_CATEGORY_BUDGET,
  LOGIN_PATH,
} from "../../constants/Constants";

export default class CreateBudget extends Component {
  constructor(props) {
    super(props);

    const date = new Date(); // 2009-11-10
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    this.state = {
      totalBudget: 0,
      housingBudget: 0,
      utilitiesBudget: 0,
      transportationBudget: 0,
      foodBudget: 0,
      medicalBudget: 0,
      savingsBudget: 0,
      personalBudget: 0,
      entertainmentBudget: 0,
      otherBudget: 0,
      currentMonth: month,
      currentYear: year,
      error: false,
      success: false
    };
    this.handleTotalBudgetChange = this.handleTotalBudgetChange.bind(this);
    this.getBudgetUsed = this.getBudgetUsed.bind(this);

    this.getVariant = this.getVariant.bind(this);
    this.handleHousingBudgetChange = this.handleHousingBudgetChange.bind(this);

    this.getHousingVariant = this.getHousingVariant.bind(this);
    this.handleUtilitiesBudgetChange = this.handleUtilitiesBudgetChange.bind(
      this
    );

    this.getUtilitiesVariant = this.getUtilitiesVariant.bind(this);
    this.handleTransportationBudgetChange = this.handleTransportationBudgetChange.bind(
      this
    );

    this.handleFoodBudgetChange = this.handleFoodBudgetChange.bind(this);
    this.getFoodVariant = this.getFoodVariant.bind(this);

    this.handleMedicalBudgetChange = this.handleMedicalBudgetChange.bind(this);
    this.getMedicalVariant = this.getMedicalVariant.bind(this);

    this.handleSavingsBudgetChange = this.handleSavingsBudgetChange.bind(this);
    this.getSavingsVariant = this.getSavingsVariant.bind(this);

    this.handleEntertainmentBudgetChange = this.handleEntertainmentBudgetChange.bind(
      this
    );
    this.getEntertainmentVariant = this.getEntertainmentVariant.bind(this);

    this.handleOtherBudgetChange = this.handleOtherBudgetChange.bind(this);
    this.getOtherVariant = this.getOtherVariant.bind(this);

    this.handlePersonalBudgetChange = this.handlePersonalBudgetChange.bind(
      this
    );
    this.getPersonalVariant = this.getPersonalVariant.bind(this);
    this.getButtonActive = this.getButtonActive.bind(this);

    this.isOverBudget = this.isOverBudget.bind(this);
    this.isMoneyLeftOver = this.isMoneyLeftOver.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getBudgetInfo();
  }

  getBudgetInfo = async () => {
    var response = await fetch(GET_CATEGORY_BUDGET, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      // credentials: 'same-origin'
    }).catch((err) => {
      console.error(err);
    });
    // console.log(await response.json);

    if (response.status !== 200) {
      // history.push(LOGIN_PATH);
      return;
    }

    var body = await response.json();
    // console.log(body);

    var temp = {
      housingBudget: 0,
      utilitiesBudget: 0,
      transportationBudget: 0,
      foodBudget: 0,
      medicalBudget: 0,
      savingsBudget: 0,
      personalBudget: 0,
      entertainmentBudget: 0,
      otherBudget: 0,
    };
    var tempTotalBudget = 0;
    body.forEach((element) => {
      // console.log(element);
      tempTotalBudget += element.budgeted;
      switch (element.category) {
        case "Housing":
          temp.housingBudget = element.budgeted;
          break;
        case "Utilities":
          temp.utilitiesBudget = element.budgeted;
          break;
        case "Transportation":
          temp.transportationBudget = element.budgeted;
          break;
        case "Food":
          temp.foodBudget = element.budgeted;
          break;
        case "Medical":
          temp.medicalBudget = element.budgeted;
          break;
        case "Savings":
          temp.savingsBudget = element.budgeted;
          break;
        case "Personal":
          temp.personalBudget = element.budgeted;
          break;
        case "Entertainment":
          temp.entertainmentBudget = element.budgeted;
          break;
        case "Other":
          temp.otherBudget = element.budgeted;
          break;
        default:
          console.log("Unknown budget category detected!");
          console.log(element);
      }
    });
    console.log(temp);
    this.setState(temp);
    this.setState({ totalBudget: tempTotalBudget });
  };

  handleSubmit = async () => {
    // console.log("TEST");

    // Check if the budget Used is greater than total Budget
    if (this.getBudgetUsed() > this.state.totalBudget) {
      return;
    }
    const date = new Date();

    const monthNumber = date.getMonth();
    const yearNumber = date.getFullYear();

    var response = await fetch(POST_CREATE_BUDGET, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        month: Number(monthNumber),
        year: Number(yearNumber),
        total: Number(this.state.totalBudget),
        housing: Number(this.state.housingBudget),
        utilities: Number(this.state.utilitiesBudget),
        transportation: Number(this.state.transportationBudget),
        food: Number(this.state.foodBudget),
        medical: Number(this.state.medicalBudget),
        savings: Number(this.state.savingsBudget),
        personal: Number(this.state.personalBudget),
        entertainment: Number(this.state.entertainmentBudget),
        other:
          Number(this.state.otherBudget) +
          Number(this.state.totalBudget) -
          Number(this.getBudgetUsed())
      }),
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.status === 200) {
      this.setState({ error: false, success: true });
    }
    if (response.status === 400) {
      this.setState({ error: true, success: false });
    }
  };

  getBudgetUsed() {
    //console.log(this.state)
    var budgetUsed =
      Number(this.state.housingBudget) +
      Number(this.state.utilitiesBudget) +
      Number(this.state.transportationBudget) +
      Number(this.state.foodBudget) +
      Number(this.state.medicalBudget) +
      Number(this.state.savingsBudget) +
      Number(this.state.entertainmentBudget) +
      Number(this.state.otherBudget);
    //console.log(budgetUsed)
    return budgetUsed;
  }

  handleTotalBudgetChange(event) {
    // console.log(event.target.value)
    this.setState({ totalBudget: event.target.value });
  }

  handleHousingBudgetChange(event) {
    this.setState({ housingBudget: event.target.value });
  }

  handleUtilitiesBudgetChange(event) {
    this.setState({ utilitiesBudget: event.target.value });
  }

  handleTransportationBudgetChange(event) {
    this.setState({ transportationBudget: event.target.value });
  }

  handleFoodBudgetChange(event) {
    this.setState({ foodBudget: event.target.value });
  }

  handleMedicalBudgetChange(event) {
    this.setState({ medicalBudget: event.target.value });
  }

  handleSavingsBudgetChange(event) {
    this.setState({ savingsBudget: event.target.value });
  }

  handleEntertainmentBudgetChange(event) {
    this.setState({ entertainmentBudget: event.target.value });
  }

  handleOtherBudgetChange(event) {
    this.setState({ otherBudget: event.target.value });
  }

  handlePersonalBudgetChange(event) {
    this.setState({ personalBudget: event.target.value });
  }

  getVariant() {
    if (this.getBudgetUsed() > this.state.totalBudget) {
      return "danger";
    } else {
      return "success";
    }
  }

  getButtonActive() {
    if (this.getBudgetUsed() > this.state.totalBudget) {
      return true;
    } else {
      return false;
    }
  }

  getHousingVariant() {
    if (Number(this.state.housingBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getUtilitiesVariant() {
    if (Number(this.state.utilitiesBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getTransportationVariant() {
    if (
      Number(this.state.transportationBudget) > Number(this.state.totalBudget)
    ) {
      return "danger";
    } else {
      return "success";
    }
  }

  getFoodVariant() {
    if (Number(this.state.foodBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getMedicalVariant() {
    if (Number(this.state.medicalBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getSavingsVariant() {
    if (Number(this.state.savingsBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getEntertainmentVariant() {
    if (
      Number(this.state.entertainmentBudget) > Number(this.state.totalBudget)
    ) {
      return "danger";
    } else {
      return "success";
    }
  }

  getOtherVariant() {
    if (Number(this.state.otherBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  getPersonalVariant() {
    if (Number(this.state.personalBudget) > Number(this.state.totalBudget)) {
      return "danger";
    } else {
      return "success";
    }
  }

  isOverBudget() {
    if (Number(this.state.totalBudget) - Number(this.getBudgetUsed()) < 0) {
      return true;
    } else {
      return false;
    }
  }

  isMoneyLeftOver() {
    if (Number(this.state.totalBudget) - Number(this.getBudgetUsed()) > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <Container fluid>
          <Row>
            <Col>
              <div>
                <Jumbotron className={this.context.isDarkMode ? "bg-dark" : ""}>
                  <h1>Let's Create Your Budget</h1>
                  <p>
                    Using <b>FINEX</b> you can budget your month in categories
                    and then get feedback as the month progresses.
                  </p>
                  <p>
                    You are creating a budget for{" "}
                    <b>
                      {this.state.currentMonth} {this.state.currentYear}
                    </b>
                  </p>
                </Jumbotron>
                <Form>
                  <Form.Group>
                    <Form.Label>
                      First, How much do you want to spend this month?
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 300"
                        onChange={this.handleTotalBudgetChange}
                        id="total-budget-input"
                        value={this.state.totalBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                Now, decide how much money you want to spend in each category.
                <br />
                You have used <b>${this.getBudgetUsed()}</b> of your{" "}
                <b>${this.state.totalBudget}</b> budget. (
                <b>${this.state.totalBudget - this.getBudgetUsed()}</b> left)
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.getBudgetUsed()}
                  variant={this.getVariant()}
                />
                <Collapse in={this.isOverBudget()}>
                  <div>
                    <br />
                    <Alert variant="danger">
                      You are <b>Over Budget</b>! Either increase your Total
                      Budget, or decrease your category spending to fix this
                      error.
                    </Alert>
                  </div>
                </Collapse>
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Housing</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleHousingBudgetChange}
                        value={this.state.housingBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.housingBudget}
                  variant={this.getHousingVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Utilities</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleUtilitiesBudgetChange}
                        value={this.state.utilitiesBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.utilitiesBudget}
                  variant={this.getUtilitiesVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Transportation</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleTransportationBudgetChange}
                        value={this.state.transportationBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.transportationBudget}
                  variant={this.getTransportationVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Food</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleFoodBudgetChange}
                        value={this.state.foodBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.foodBudget}
                  variant={this.getFoodVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Medical</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleMedicalBudgetChange}
                        value={this.state.medicalBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.medicalBudget}
                  variant={this.getMedicalVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Savings</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleSavingsBudgetChange}
                        value={this.state.savingsBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.savingsBudget}
                  variant={this.getSavingsVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Personal</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handlePersonalBudgetChange}
                        value={this.state.personalBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.personalBudget}
                  variant={this.getPersonalVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Entertainment</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleEntertainmentBudgetChange}
                        value={this.state.entertainmentBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.entertainmentBudget}
                  variant={this.getEntertainmentVariant()}
                />
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Other</b>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="ex. 200"
                        onChange={this.handleOtherBudgetChange}
                        value={this.state.otherBudget}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <ProgressBar
                  max={this.state.totalBudget}
                  now={this.state.otherBudget}
                  variant={this.getOtherVariant()}
                />
                <br />
                <Collapse in={this.isOverBudget()}>
                  <div>
                    <br />
                    <Alert variant="danger">
                      You are <b>Over Budget</b> by{" "}
                      <b>${this.getBudgetUsed() - this.state.totalBudget}</b>!
                      You cannot submit while Over Budget. Please either
                      increase your Total Budget or decrease spending in
                      different categories.
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={!this.isOverBudget() && !this.isMoneyLeftOver()}>
                  <div>
                    <br />
                    <Alert variant="success">
                      Your budget is looking good! If you are finished setting
                      up your categories, click Submit below. <br />
                      Here is a summary of your budget: <br />
                      <Table>
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Budget</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Housing</td>
                            <td>{this.state.housingBudget}</td>
                          </tr>
                          <tr>
                            <td>Utilities</td>
                            <td>{this.state.utilitiesBudget}</td>
                          </tr>
                          <tr>
                            <td>Transportation</td>
                            <td>{this.state.transportationBudget}</td>
                          </tr>
                          <tr>
                            <td>Food</td>
                            <td>{this.state.foodBudget}</td>
                          </tr>
                          <tr>
                            <td>Medical</td>
                            <td>{this.state.medicalBudget}</td>
                          </tr>
                          <tr>
                            <td>Savings</td>
                            <td>{this.state.savingsBudget}</td>
                          </tr>
                          <tr>
                            <td>Personal</td>
                            <td>{this.state.personalBudget}</td>
                          </tr>
                          <tr>
                            <td>Entertainment</td>
                            <td>{this.state.entertainmentBudget}</td>
                          </tr>
                          <tr>
                            <td>Other</td>
                            <td>{this.state.otherBudget}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Total</b>
                            </td>
                            <td>
                              <b>{this.state.totalBudget}</b>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={this.isMoneyLeftOver()}>
                  <div>
                    <br />
                    <Alert variant="warning">
                      You have not used all of your Total Budget yet. If you
                      Submit, the leftover{" "}
                      <b>${this.state.totalBudget - this.getBudgetUsed()}</b>{" "}
                      will go into the <b>Other</b> category.
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={this.state.success}>
                  <div>
                    <Alert variant="success">
                      <Alert.Heading>Success</Alert.Heading>
                      <p>Your Budget has been successfully created!</p>
                      <p>
                        If you don't need to change it again, you can navigate
                        back to the Finance Dashboard
                      </p>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="outline-success"
                          onClick={() => history.push(FINANCE_DASHBOARD)}
                        >
                          Finance Dashboard
                        </Button>
                      </div>
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={this.state.error}>
                  <div>
                    <Alert variant="danger">
                      <Alert.Heading>Error</Alert.Heading>
                      <p>
                        Something went wrong. Please try submiting again. If
                        this error continues please try checking your internet
                        connection or try restarting your Web Browser.
                      </p>
                    </Alert>
                  </div>
                </Collapse>
                <Button
                  disabled={this.getButtonActive()}
                  active={this.getButtonActive()}
                  variant={this.getVariant()}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </Col>
            <Col>
              <div className={classes.stackTop}>
                <BudgetGraph budget={this.state}></BudgetGraph>
                <BudgetAdvice budget={this.state}></BudgetAdvice>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

CreateBudget.contextType = DarkModeContext;
