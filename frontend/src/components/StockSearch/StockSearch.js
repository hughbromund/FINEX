import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import classes from './StockSearch.module.css'

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
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="toggle"></Dropdown.Toggle>
                    {this.getCurrList()}
                </Dropdown>
            </div>
        );

    }

}

export default StockSearch;