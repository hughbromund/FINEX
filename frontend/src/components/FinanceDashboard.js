import React, { Component } from 'react'

import classes from "./FinanceDashboard.module.css"

import TransactionToast from "./TransactionToast"

// import Jumbotron from 'react-bootstrap/Jumbotron'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'

export default class FinanceDashboard extends Component {
    constructor(props) {
        super(props)
        this.generateTransactions = this.generateTransactions.bind(this)
    }

    generateTransactions() {
        const inputs = []
        for (let i = 0; i < 10; i++) {
            inputs.push(<div><TransactionToast amount={i} classification="shopping"></TransactionToast></div>)
        }
        // console.log(inputs)
        return inputs
    }



    render() {
        this.generateTransactions()
        return (
            <div>
                <Navbar 
                sticky="top" 
                variant="dark"
                className={classes.navbar}>
                    <Container>
                        <Navbar.Brand>Your Finance Dashboard</Navbar.Brand>
                    </Container>
                </Navbar>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <h4><b>Your Recent Transactions</b></h4>
                    </Toast.Header>
                </Toast>
                {this.generateTransactions()}
            </div>
        )
    }
}
