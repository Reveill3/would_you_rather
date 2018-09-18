import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {

  handleLogin = (e) => {
    const { dispatch, users, userids } = this.props
    e.target.value != 'Select A User' ?
    dispatch(setAuthedUser(
      users[userids.filter((id) => users[id].name === e.target.value)]
    )):dispatch(setAuthedUser(false))
  }

  render(){

    return(
    <div>
      <div>Would You Rather?</div>
      <div>Please Log In</div>
      <select onChange={this.handleLogin}>
        <option>Select A User</option>
        {this.props.userids.map( (user) => (
          <option key={this.props.users[user].id}>{this.props.users[user].name}</option>
        ))}
      </select>
    </div>
  )
}}

function mapStateToProps ({ users }) {
  return {
    userids: Object.keys(users),
    users: users
  }
}

export default connect(mapStateToProps)(Login)
