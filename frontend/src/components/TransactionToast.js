import React, { Component } from 'react'

import Toast from 'react-bootstrap/Toast'

export default class TransactionToast extends Component {
    render() {
        // console.log(this.props)
        const amount = this.props.amount
        const classification = this.props.classification
        return (
            <div>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <b>Transaction</b>
                    </Toast.Header>
                    <Toast.Body>
                        Total Cost: ${amount} <br />
                        Classification: {classification}
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}
