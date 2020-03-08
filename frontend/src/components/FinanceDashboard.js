import React, { Component } from 'react'

import classes from "./FinanceDashboard.module.css"

import TransactionToast from "./TransactionToast"
import MonthProgress from "./MonthProgress"
import CategoryProgress from "./CategoryProgress"

// import Jumbotron from 'react-bootstrap/Jumbotron'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class FinanceDashboard extends Component {
    constructor(props) {
        super(props)
        this.generateTransactions = this.generateTransactions.bind(this)
    }

    generateTransactions() {
        const inputs = []
        for (let i = 0; i < 10; i++) {
            inputs.push(<div key={i}><TransactionToast amount={i} classification="shopping"></TransactionToast></div>)
        }
        // console.log(inputs)
        return inputs
    }

    render() {
        // this.generateTransactions()
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
                            <Card style={{flex: 1}}>
                                <Card.Header>
                                    <b>Your Recent Transactions</b>
                                </Card.Header>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <b>Add a new Transaction</b>
                                </Card.Header>
                                <Card.Body>
                                    <Button variant="success">Add a Transaction</Button>
                                </Card.Body>
                            </Card>
                            {this.generateTransactions()}
                        </Col>
                        <Col>
                            <Card style={{flex: 1}}>
                                <Card.Header>
                                    <b>Your Recent Income</b>
                                </Card.Header>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <b>Add a new Income</b>
                                </Card.Header>
                                <Card.Body>
                                    <Button variant="success">Add an Income</Button>
                                </Card.Body>
                            </Card>
                            {this.generateTransactions()}
                        </Col>
                        <Col>
                            <Row>
                                <Card style={{flex: 1}}>
                                    <Card.Header>
                                        <b>Monthly Budget Progress</b>
                                    </Card.Header>
                                    <Card.Body>
                                        <MonthProgress onTrack={false}></MonthProgress>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card style={{flex: 1}}>
                                    <Card.Header>
                                        <b>Category Breakdown</b>
                                    </Card.Header>
                                    <Card.Body>
                                        <CategoryProgress 
                                        category="Shopping" 
                                        currentSpending={30} 
                                        budgetedSpending={150}>
                                        </CategoryProgress>
                                        <CategoryProgress 
                                        category="Utilities" 
                                        currentSpending={80} 
                                        budgetedSpending={300}>
                                        </CategoryProgress>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
