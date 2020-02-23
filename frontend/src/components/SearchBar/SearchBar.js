import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import classes from './SearchBar.module.css'
import { STOCK_LIST_API } from '../../constants/Constants';
import history from '../../routing/History';
import { YOUR_STOCKS_PATH } from '../../constants/Constants';

class SearchBar extends Component {

    state = {
        stockList: [[]],
        inputValue: ""
    }

    /*
    * Gets stock list from API on component mount.
    */
    componentDidMount = () => {
        this.callListAPI()
            .catch(err => console.log(err));
    }

    /*
    * Makes a call to backend requesting stock list based on
    * input provided.
    */
    callListAPI = async (currInputVal) => {
        console.log("http://localhost:5000" + STOCK_LIST_API + currInputVal)
        const response = await fetch("http://localhost:5000" + STOCK_LIST_API + currInputVal);
        const body = await response.json();
        this.setState({stockList:body});
      
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    }

    updateValue = (newVal) => {
        this.setState({inputValue:newVal});
        this.callListAPI(newVal)
            .catch(err => console.log(err));
    }

    getCurrList = () => {
        let currList = [];
        for (let i = 0; i < this.state.stockList.length; i++) {
            currList.push(
                <Dropdown.Item key={i} eventKey={i} onSelect={eventKey => {this.updateValue(this.state.stockList[eventKey][1])}}>
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
                <Button variant="success" className={classes.searchButton} onClick={() => history.push(YOUR_STOCKS_PATH)}> 
                    Search 
                </Button>
            </div>
        );
    }

}

export default SearchBar;