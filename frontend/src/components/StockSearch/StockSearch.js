import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import classes from './StockSearch.module.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';


class StockSearch extends Component {

    state = {
        stockList: ["GOOG", "APPL", "IBM", "BUX", "STONKS", "STOCKS", "TEST1", "TEST2"],
        inputValue: ""
    }

    setValue = (newVal) => {
        this.setState({inputValue:newVal});
    }

    //Might not be a required method
    getCurrList = () => {
        let currList = [];
        for (let i = 0; i < this.state.stockList.length; i++) {
            if (this.state.stockList[i].startsWith(this.state.inputValue)) {
                currList.push(
                    <Dropdown.Item eventKey={i} onSelect={eventKey => {this.setValue(this.state.stockList[eventKey])}}>
                        {this.state.stockList[i]}
                    </Dropdown.Item>
                )
            }
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
                    onChange={e => this.setValue(e.target.value)}
                />
                {children}
            </div> 
        ));

        return (
            <div className={classes.wrapper}>
                <div className={classes.innerDiv}>
                    <Jumbotron className={classes.jumbo}>
                            <h1>Welcome to FINEX's Stock Search Page!</h1>
                            <p>
                                Below, you may search for a stock by symbol or name. Clicking on the stock will bring you to its own, 
                                dedicated screen where you can learn more about its recent trends.
                            </p>
                    </Jumbotron>
                </div>
                <div className={classes.innerDiv}>
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="toggle"></Dropdown.Toggle>
                        {this.getCurrList()}
                    </Dropdown>
                </div>
            </div>
        );

    }

}

export default StockSearch;