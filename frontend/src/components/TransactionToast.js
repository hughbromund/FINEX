import React, { Component } from 'react'

import Toast from 'react-bootstrap/Toast'
import Card from 'react-bootstrap/Card'

export default class TransactionToast extends Component {
    render() {
        // console.log(this.props)
        const amount = this.props.amount
        const classification = this.props.classification
        const name = this.props.name
        return (
            <div>
                <Card style={{flex: 1}}>
                    <Card.Header>
                        <b>Transaction</b>
                    </Card.Header>
                    <Card.Body>
                        <b>Name:</b>  {name} <br />
                        <b>Total Cost:</b> ${amount} <br />
                        <b>Category:</b> {classification}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
