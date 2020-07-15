import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from "../actions/transactionActions"
import { bindActionCreators } from 'redux'

class TransactionForm extends Component {

    state = {
        ...this.returnStateObject()
    }
    returnStateObject() {
        if (this.props.currentIndex === -1)
            return {
                bName: '',
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.currentIndex !== this.props.currentIndex ||
            prevProps.list.lenght !== this.props.list.lenght
        )
            this.setState({ ...this.returnStateObject() })
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.insertTransaction(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    className="form-control form-control-sm"
                    name="bName"
                    placeholder="Type here for add a new todo"
                    value={this.state.bName}
                    onChange={this.handleInputChange}
                /> <br />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
