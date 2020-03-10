import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'

import { GET_OVERALL_BUDGET } from "../constants/Constants"

export default class MonthProgress extends Component {

    constructor(props) {
        super(props)

        var today = new Date();

        // console.log(today)
        this.state = 
        {
            month : today.getMonth(),
            day : today.getDate(),
            year : today.getFullYear(),
            budgeted : 0,
            spent : 0
        }
        // console.log(this.state)

        this.getDaysInMonth = this.getDaysInMonth.bind(this)
        this.getVarient = this.getVarient.bind(this)
        this.getBudgetProgress = this.getBudgetProgress.bind(this)
    }

componentDidMount() {
    this.getBudgetProgress()
}

    getDaysInMonth() {
        // console.log(new Date(this.state.year, this.state.month, 0).getDate())
        return new Date(this.state.year, this.state.month, 0).getDate();
    }

    getVarient() {
        // console.log(onTrack)
        if (this.onTrack() == true) {
            return "success"
        } else {
            return "danger"
        }
    }


    onTrack() {
        var daysInMonth = this.getDaysInMonth();

        var budgetPerDay = this.state.budgeted / daysInMonth;
        // console.log(budgetPerDay)
        // var currentPerDay = this.state.currentSpending / daysInMonth;

        var projectedSpending = budgetPerDay * this.state.day;

        //console.log(projectedSpending)
        //console.log(this.state.spent)

        if (projectedSpending > this.state.spent) {
            return true;
        } else {
            return false;
        }
    }

    getBudgetProgress = async() => {
        var response = await fetch(GET_OVERALL_BUDGET,{
            method: "GET",
            withCredentials : true,
            // credentials: 'same-origin'
        }).catch(err => {
            console.error(err)
        })

        var body = await response.json()
        // console.log(body)

        this.setState(
            {
                budgeted : body.budgeted,
                spent : body.spent
            })
    }


    render() {
        // console.log(onTrack)
        // console.log(this.getDaysInMonth(month,year))
        return (
            <div>
                <b>Current Spending:</b> ${this.state.spent} <br />
                <b>Budgeted Spending:</b> ${this.state.budgeted}
                <ProgressBar 
                    variant={this.getVarient()} 
                    now={this.state.day}
                    max={this.getDaysInMonth()}>
                </ProgressBar>
                <div>
                    There are <b>{this.getDaysInMonth() - this.state.day}</b> days left this Month!
                </div>
                <div hidden={this.onTrack()}>
                    You are not on track for this Month! <br />
                    Try spending less or revise your budget to get back on track!
                </div>
                <div hidden={!this.onTrack()}>
                    Your Budget is Looking Good! <br />
                </div>

            </div>
        )
    }
}
