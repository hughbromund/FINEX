import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import classes from './SearchBar.module.css'
import { STOCK_LIST_URL } from '../../constants/Constants';
import history from '../../routing/History';
import { YOUR_STOCKS_PATH } from '../../constants/Constants';

/**
 * The SearchBar component creates a search bar for stocks,
 * both names an symbols, to be used elsewhere on the site.
 * The search bar pulls the stocks to be shown in a dropdown
 * from the backend API.
 */
class SearchBar extends Component {

    // Stateful component stores list of stocks to display as well as current input value
    state = {
        stockList: [[]],
        inputValue: ""
    }

    /**
     * Gets stock list from API on component mount.
     */
    componentDidMount = () => {
        this.callListAPI(this.state.inputValue)
            .catch(err => console.log(err));
    }

    /**
     * Makes a call to backend requesting stock list based on
     * input provided.
     */
    callListAPI = async (currInputVal) => {
        console.log(STOCK_LIST_URL + currInputVal)
        const response = await fetch(STOCK_LIST_URL + currInputVal);
        const body = await response.json();
        this.setState({stockList:body});
      
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    }

    /**
     * The update value function makes an API request when the user types in a
     * different input into the search bar.
     */
    updateValue = (newVal) => {
        this.setState({inputValue:newVal});
        this.callListAPI(newVal)
            .catch(err => console.log(err));
    }

    /**
     * Gets the current list to be displayed and creates a menu
     * displaying the aforementioned items.
     */
    getCurrList = () => {
        let currList = [];
        for (let i = 0; i < this.state.stockList.length; i++) {
            currList.push(
                <Dropdown.Item key={i} eventKey={i} onSelect={eventKey => {this.updateValue(this.state.stockList[eventKey][0])}}>
                    {this.state.stockList[i][1]}
                </Dropdown.Item>
            )
        }
        if (currList.length == 0) {
            return;
        }
        return (
            <Dropdown.Menu>
                {currList}
            </Dropdown.Menu>
        );
    }

    render() {

        // Custom toggle created using a form as the trigger
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <div>
                <FormControl 
                    autoFocus
                    placeholder={'Search for a stock...'}
                    value={this.state.inputValue}
                    ref={ref}
                    className={classes.form}
                    onClick={e => {
                        e.preventDefault();
                        onClick(e);
                    }}
                    onChange={e => this.updateValue(e.target.value)}
                />
                {children}
            </div> 
        ));

        return (
            <div className={classes.wrapper}>
                <Dropdown className={classes.bar}>
                    <Dropdown.Toggle as={CustomToggle} id="toggle"></Dropdown.Toggle>
                    {this.getCurrList()}
                </Dropdown>
                <Button variant="success" className={classes.searchButton} onClick={() => history.push(YOUR_STOCKS_PATH + '/' + this.state.inputValue)}> 
                    Search 
                </Button>
            </div>
        );
    }

}

export default SearchBar;