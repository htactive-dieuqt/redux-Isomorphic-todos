import React, { Component } from 'react'

import TransactionForm from './TransactionForm'
import { connect } from 'react-redux'
import * as actions from "../actions/transactionActions"
import { bindActionCreators } from 'redux'

import {
    EditOutlined,
    CloseOutlined
} from '@ant-design/icons';

class TransactionList extends Component {

    state = {
        currentIndex: -1,
        list: this.returnList(),
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    returnList() {
        if (localStorage.getItem('transactions') === null)
            localStorage.setItem('transactions', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('transactions'))
    }

    onAddOrEdit = (data) => {
        var list = this.returnList()
        if (this.state.currentIndex === -1) {
            list.push(data)
        }
        else {
            list[this.state.currentIndex] = data
        }
        localStorage.setItem('transactions', JSON.stringify(list))
        this.setState({ list, currentIndex: -1 })
    }

    handleEdit = index => {
        console.log(index);
        this.props.updateTransactionIndex(index)
    }

    handleDelete = index => {
        this.props.deleteTransaction(index)
    }

    render() {
        return (
            <div>
                <TransactionForm />
                <br />

                <div className="menu">
                    <span style={{ color: "blue" }}>All</span> | {''}
                    <span>Uncompleted</span> | {' '}
                    <span>Completed</span>
                </div>
                <br /> <br />
                <table
                    style={{ backgroundColor: '#fff', border: "2px solid #e0d0d0" }}
                    className="table table-white table-striped">
                    <tbody>
                        {
                            this.props.list.map((item, index) => (
                                (index === item.id) ? (
                                    <tr key={index}>
                                        <td style={{ width: 50 }}><input type="checkbox" style={{ width: 20 }} /></td>
                                        <td width={500} style={{ height: "auto", wordBreak: "break-all" }}>
                                            <label htmlFor="vehicle1"> 15/7/2020 </label>
                                            <br></br>
                                            <textarea
                                                class="form-control"
                                                value={item.bName}
                                                rows="3"></textarea>
                                        </td>
                                        <td ><EditOutlined onClick={() => this.handleEdit(index)}> Edit </EditOutlined></td>
                                        <td ><CloseOutlined onClick={() => this.handleDelete(index)}> Delete </CloseOutlined></td>
                                    </tr>
                                ) :
                                    <tr key={index}>
                                        <td style={{ width: 50 }}><input type="checkbox" style={{ width: 20 }} /></td>
                                        <td width={500} style={{ height: "auto", wordBreak: "break-all" }}>
                                            <label htmlFor="vehicle1"> 15/7/2020 </label>
                                            <br></br>
                                            {item.bName}
                                        </td>
                                        <td ><EditOutlined onClick={() => this.handleEdit(index)}> Edit </EditOutlined></td>
                                        <td ><CloseOutlined onClick={() => this.handleDelete(index)}> Delete </CloseOutlined></td>
                                    </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteTransaction: actions.Delete,
        updateTransactionIndex: actions.UpdateIndex
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
