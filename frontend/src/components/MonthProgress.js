import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'

export default class MonthProgress extends Component {

    constructor(props) {
        super(props)

        var today = new Date();

        // console.log(props)
        this.state = 
        {
            month : today.getMonth(),
            day : today.getDay(),
            year : today.getFullYear(),
            onTrack : props.onTrack
        }
        // console.log(this.state)

        this.getDaysInMonth = this.getDaysInMonth.bind(this)
        this.getVarient = this.getVarient.bind(this)
    }

    getDaysInMonth() {
        // console.log(new Date(this.state.year, this.state.month, 0).getDate())
        return new Date(this.state.year, this.state.month, 0).getDate();
    }

    getVarient() {
        // console.log(onTrack)
        if (this.state.onTrack == true) {
            return "success"
        } else {
            return "danger"
        }
    }


    render() {
        // console.log(onTrack)
        // console.log(this.getDaysInMonth(month,year))
        return (
            <div>
                <ProgressBar 
                    variant={this.getVarient()} 
                    now={this.state.day} 
                    max={this.getDaysInMonth()}>
                </ProgressBar>
                <div hidden={this.state.onTrack}>
                    You are not on track for this Month! <br />
                </div>
                <div hidden={!this.state.onTrack}>
                    Your Budget is Looking Good! <br />
                </div>
                <div>
                    There are <b>{this.getDaysInMonth() - this.state.day}</b> days left this Month!
                </div>

            </div>
        )
    }
}
