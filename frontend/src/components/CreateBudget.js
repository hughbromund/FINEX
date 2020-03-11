import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup";

export default class CreateBudget extends Component {

    constructor(props) {
        super(props);

        this.state = 
        {
            totalBudget : 0,
            housingBudget : 0,
            utilitiesBudget : 0,
            transportationBudget : 0,
            foodBudget : 0,
            medicalBudget : 0,
            savingsBudget : 0,
            entertainmentBudget : 0,
            otherBudget : 0,
        }
        this.handleTotalBudgetChange = this.handleTotalBudgetChange.bind(this)
        this.getBudgetUsed = this.getBudgetUsed.bind(this)
        this.getVariant = this.getVariant.bind(this)
        this.handleHousingBudgetChange = this.handleHousingBudgetChange.bind(this)
        this.getHousingVariant = this.getHousingVariant.bind(this)
        this.handleUtilitiesBudgetChange = this.handleUtilitiesBudgetChange.bind(this)
        this.getUtilitiesVariant = this.getUtilitiesVariant.bind(this)
        this.handleTransportationBudgetChange = this.handleTransportationBudgetChange.bind(this)
    }

    getBudgetUsed() {
        //console.log(this.state)
        var budgetUsed = Number(this.state.housingBudget) + Number(this.state.utilitiesBudget) + Number(this.state.transportationBudget) + Number(this.state.foodBudget) + Number(this.state.medicalBudget) + Number(this.state.savingsBudget) + Number(this.state.entertainmentBudget) + Number(this.state.otherBudget)
        //console.log(budgetUsed)
        return budgetUsed
    }

    handleTotalBudgetChange(event) {
        // console.log(event.target.value)
        this.setState({totalBudget : event.target.value})
    }

    handleHousingBudgetChange(event) {
        this.setState({housingBudget : event.target.value})
    }

    handleUtilitiesBudgetChange(event) {
        this.setState({utilitiesBudget : event.target.value})
    }

    handleTransportationBudgetChange(event) {
        this.setState({transportationBudget : event.target.value})
    }

    getVariant() {
        if (this.getBudgetUsed() > this.state.totalBudget) {
            return "danger"
        } else {
            return "success"
        }
    }

    getHousingVariant() {
        if (Number(this.state.housingBudget) > Number(this.state.totalBudget)) {
            return "danger"
        } else {
            return "success"
        }
    }

    getUtilitiesVariant() {
        if (Number(this.state.utilitiesBudget) > Number(this.state.totalBudget)) {
            return "danger"
        } else {
            return "success"
        }
    }

    getTransportationVariant() {
        if (Number(this.state.transportationBudget) > Number(this.state.totalBudget)) {
            return "danger"
        } else {
            return "success"
        }
    }


    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <h1>Let's Create a Budget</h1>
                    <p>
                        Using <b>FINEX</b> you can budget your month in categories and then get feedback as the month progresses. 
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
                            onChange={this.handleTotalBudgetChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <br />
                Now, decide how much money you want to spend in each category.
                <br />
                You have used ${this.getBudgetUsed()} of your ${this.state.totalBudget} budget. 
                <ProgressBar max={this.state.totalBudget} now={this.getBudgetUsed()} variant={this.getVariant()}/>
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
                            onChange={this.handleHousingBudgetChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <ProgressBar max={this.state.totalBudget} now={this.state.housingBudget} variant={this.getHousingVariant()}/>
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
                            onChange={this.handleUtilitiesBudgetChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <ProgressBar max={this.state.totalBudget} now={this.state.utilitiesBudget} variant={this.getUtilitiesVariant()}/>
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
                            onChange={this.handleTransportationBudgetChange}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <ProgressBar max={this.state.totalBudget} now={this.state.transportationBudget} variant={this.getTransportationVariant()}/>


                
            </div>
        )
    }
}
