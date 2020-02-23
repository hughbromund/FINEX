import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import classes from './SearchBar.module.css'
import { STOCK_LIST_API } from '../../constants/Constants';

class SearchBar extends Component {

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

    render() {
        return (
            <div>

            </div>
        );
    }

}

export default SearchBar;