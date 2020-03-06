import React, { Component } from 'react'

import classes from "./FinanceDashboard.module.css"

import TransactionToast from "./TransactionToast"
import MonthProgress from "./MonthProgress"

// import Jumbotron from 'react-bootstrap/Jumbotron'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                <Container fluid>
                    <Row>
                        <Col>
                            <Toast>
                                <Toast.Header closeButton={false}>
                                    <h4><b>Your Recent Transactions</b></h4>
                                </Toast.Header>
                            </Toast>
                            {this.generateTransactions()}
                        </Col>
                        <Col>
                            <Toast>
                                <Toast.Header closeButton={false}>
                                    <h4><b>Your Recent Income</b></h4>
                                </Toast.Header>
                            </Toast>
                            {this.generateTransactions()}
                        </Col>
                        <Col>
                            <Row>
                                <Toast>
                                    <Toast.Header closeButton={false}>
                                        <h4><b>Monthly Budget Progress</b></h4>
                                    </Toast.Header>
                                </Toast>
                            </Row>
                            <Row>
                                <MonthProgress onTrack={false} month="3" year="2020" day="10"></MonthProgress>
                            </Row>
                            <Row>
                                <Toast>
                                    <Toast.Header closeButton={false}>
                                        <h5><b>Category Breakdown</b></h5>
                                    </Toast.Header>
                                </Toast>
                            </Row>
                            <Row>
                                
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
