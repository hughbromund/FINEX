import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import FormControl from "react-bootstrap/FormControl";
import classes from "./SearchBar.module.css";
import { STOCK_LIST_URL } from "../../constants/Constants";
import { CRYPTO_LIST_URL } from "../../constants/Constants";
import history from "../../routing/History";
import { YOUR_STOCKS_PATH, CRYPTO_EXTENSION } from "../../constants/Constants";
import { DarkModeContext } from "../../contexts/DarkModeContext";

/**
 * The SearchBar component creates a search bar for stocks,
 * both names an symbols, to be used elsewhere on the site.
 * The search bar pulls the stocks to be shown in a dropdown
 * from the backend API.
 *
 * Code Snippets From:
 * https://www.freecodecamp.org/forum/t/react-redux-adding-a-handler-for-enter-key-events/241151
 */
class SearchBar extends Component {
  // Stateful component stores list of stocks to display as well as current input value
  state = {
    stockList: [[]],
    inputValue: "",
    selected: "Stocks",
    showDropdown: true,
    auto: true,
    alsoItem: false,
  };

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  /**
   * Gets stock list from API on component mount.
   */
  componentDidMount = () => {
    if (this.state.selected === "Stocks") {
      this.callStockListAPI(this.state.inputValue).catch((err) =>
        console.log(err)
      );
    } else {
      this.callCryptoListAPI(this.state.inputValue).catch((err) =>
        console.log(err)
      );
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
      this.setState({ alsoItem: true });
    }
  }

  /**
   * Makes a call to backend requesting stock list based on
   * input provided.
   */
  callStockListAPI = async (currInputVal) => {
    console.log(STOCK_LIST_URL + currInputVal);
    const response = await fetch(STOCK_LIST_URL + currInputVal);
    const body = await response.json();
    this.setState({ stockList: body });

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  /**
   * Makes a call to backend requesting cryptocurrency list based on
   * input provided.
   */
  callCryptoListAPI = async (currInputVal) => {
    console.log(CRYPTO_LIST_URL + currInputVal);
    const response = await fetch(CRYPTO_LIST_URL + currInputVal);
    const body = await response.json();
    this.setState({ stockList: body });

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  /**
   * The update value function makes an API request when the user types in a
   * different input into the search bar.
   */
  updateValue = (newVal, stopShowing) => {
    this.setState({ inputValue: newVal });
    if (this.state.selected === "Stocks") {
      this.callStockListAPI(newVal).catch((err) => console.log(err));
    } else {
      this.callCryptoListAPI(newVal).catch((err) => console.log(err));
    }

    if (stopShowing) {
      this.setState({ showDropdown: false });
      this.setState({ alsoItem: false });
    }
  };

  /**
   * Gets the current list to be displayed and creates a menu
   * displaying the aforementioned items.
   */
  getCurrList = () => {
    if (this.state.inputValue === "") {
      return;
    }

    let currList = [];
    for (let i = 0; i < this.state.stockList.length; i++) {
      currList.push(
        <Dropdown.Item
          show={this.state.showDropdown + ""}
          key={i}
          eventKey={i}
          onSelect={(eventKey) => {
            this.setState({ alsoItem: true });
            this.updateValue(this.state.stockList[eventKey][0], true);
          }}
        >
          {this.state.stockList[i][1]}
        </Dropdown.Item>
      );
    }
    if (currList.length === 0) {
      return;
    }
    return (
      <Dropdown.Menu ref={this.setWrapperRef} show={this.state.showDropdown}>
        {currList}
      </Dropdown.Menu>
    );
  };

  /**
   * Method detects an enter button press and searches for a stock.
   */
  keyPressed(e) {
    if (e.key === "Enter") {
      history.push(YOUR_STOCKS_PATH + "/" + this.state.inputValue);
    }
  }

  /**
   * Handles styling changes and state update on click of
   * stocks toggle button.
   */
  handleStocksToggle = () => {
    this.setState({ selected: "Stocks" });
    this.callStockListAPI(this.state.inputValue).catch((err) =>
      console.log(err)
    );
  };

  /**
   * Handles styling changes and state update on click of
   * stocks toggle button.
   */
  handleCryptoToggle = () => {
    this.setState({ selected: "Crypto" });
    this.callCryptoListAPI(this.state.inputValue).catch((err) =>
      console.log(err)
    );
  };

  handleFocus = () => {
    this.setState({ showDropdown: true });
    this.setState({ auto: true });
  };

  handleUnfocus = () => {
    if (!this.state.alsoItem) {
      this.setState({ showDropdown: false });
    }
    this.setState({ auto: false });
    this.setState({ alsoItem: false });
  };

  render() {
    // Custom toggle created using a form as the trigger
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <div>
        <FormControl
          placeholder={"Search for a stock..."}
          value={this.state.inputValue}
          ref={ref}
          className={classes.form}
          onChange={(e) => this.updateValue(e.target.value, false)}
          onClick={(e) => {
            this.handleFocus();
          }}
          onBlur={(e) => this.handleUnfocus()}
          autoFocus={this.state.auto}
        />
        {children}
      </div>
    ));

    return (
      <div
        className={classes.wrapper}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            history.push(YOUR_STOCKS_PATH + "/" + this.state.inputValue);
          }
        }}
      >
        <ButtonToolbar>
          <ToggleButtonGroup
            name="radio"
            toggle
            className={classes.toggle}
            defaultValue={this.state.selected}
          >
            <ToggleButton
              variant="success"
              onClick={this.handleStocksToggle}
              value="Stocks"
              type="radio"
              name="radio"
              defaultChecked
            >
              Stocks
            </ToggleButton>
            <ToggleButton
              variant="success"
              onClick={this.handleCryptoToggle}
              value="Crypto"
              type="radio"
              name="radio"
            >
              Crypto
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <Dropdown className={classes.bar} show={this.state.showDropdown}>
          <Dropdown.Toggle as={CustomToggle} id="toggle"></Dropdown.Toggle>
          {this.getCurrList()}
        </Dropdown>
        <Button
          variant="success"
          className={classes.searchButton}
          onClick={() => {
            if (this.state.selected === "Crypto") {
              history.push(
                YOUR_STOCKS_PATH + CRYPTO_EXTENSION + this.state.inputValue
              );
            } else {
              history.push(YOUR_STOCKS_PATH + "/" + this.state.inputValue);
            }
          }}
        >
          Search
        </Button>
      </div>
    );
  }
}

SearchBar.contextType = DarkModeContext;
export default SearchBar;
