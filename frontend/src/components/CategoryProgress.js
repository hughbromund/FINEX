import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'


/*
 * 
 * This Component Takes in the currentSpending, budgetedSpending, and a category
 * Based on the CURRENT date it calcuates if the category is on Track or not.
 * It then displays the budget progress and styles it depending on whether or not the category
 * is on track.
 *
 */

export default class CategoryProgress extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        // console.log(today.getMonth())
        this.state = 
        {
            category : props.category,
            currentSpending : props.currentSpending,
            budgetedSpending : props.budgetedSpending,
            month : today.getMonth(),
            day : today.getDate(),
            year : today.getFullYear(),
        }

        this.getDaysInMonth = this.getDaysInMonth.bind(this)
        this.onTrack = this.onTrack.bind(this)
        this.getVarient = this.getVarient.bind(this)
    }

    getDaysInMonth() {
        return new Date(this.state.year, this.state.month, 0).getDate();
    }

    onTrack() {
        var daysInMonth = this.getDaysInMonth();

        var budgetPerDay = this.state.budgetedSpending / daysInMonth;
        // console.log(budgetPerDay)
        // var currentPerDay = this.state.currentSpending / daysInMonth;

        var projectedSpending = budgetPerDay * this.state.day;

        // console.log(projectedSpending)

        if (projectedSpending > this.state.currentSpending) {
            return true;
        } else {
            return false;
        }
    }

    getVarient() {
        // console.log(onTrack)
        if (this.onTrack() == true) {
            return "success"
        } else {
            return "danger"
        }
    }


    render() {
        return (
            <div>
                <b>Category: </b>{this.state.category} <br />
                <b>Budgeted Spending: </b>${this.state.budgetedSpending}
                <ProgressBar 
                now={this.state.currentSpending} 
                max={this.state.budgetedSpending}
                label={"$" + this.state.currentSpending}
                variant={this.getVarient()}>
                </ProgressBar>
                <div hidden={this.onTrack()}>
                    You are overbudget for this month. 
                </div>
                <div hidden={!this.onTrack()}>
                    Your budget is looking good. 
                </div>
            </div>
        )
    }
}
