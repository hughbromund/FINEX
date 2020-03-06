import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'

export default class MonthProgress extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = 
        {
            month : props.month,
            day : props.day,
            year : props.year,
            onTrack : props.onTrack
        }

        this.getDaysInMonth = this.getDaysInMonth.bind(this)
        this.getVarient = this.getVarient.bind(this)
    }

    getDaysInMonth() {
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
                    There are <b>{this.getDaysInMonth() - this.props.day}</b> days left this Month!
                </div>

            </div>
        )
    }
}
