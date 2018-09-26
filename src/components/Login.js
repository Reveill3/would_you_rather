import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Jumbotron, Button } from 'reactstrap'
import LoginMenu from './LoginMenu'


class Login extends Component {

  state = {
    toDashboard: false,
  }

  handleLogin = (name) => {
    const { dispatch, users, userids} = this.props
    if (name !== 'Select A User') {
    dispatch(setAuthedUser(
      users[userids.filter((id) => users[id].name === name)]
    ));
  this.setState({
    toDashboard: true
  });
  }
  else {
    dispatch(setAuthedUser(false));
    this.setState({
      toDashboard: false
    })
    }
  }

  render(){
    if ( this.state.toDashboard ) {
      return <Redirect to='/home'/>
    } else {

    return(
    <div>
      <Jumbotron>
        <div className='display-2'>Would You Rather?</div>
        <div className='display-3'>Please Log In</div>
        <hr className='my-2'/>
        <LoginMenu userids={this.props.userids} handleChange={this.handleLogin}/>
      </Jumbotron>
    </div>
  )
    }
  }
}

function mapStateToProps ({ users }) {
  return {
    userids: Object.keys(users),
    users: users
  }
}

export default connect(mapStateToProps)(Login)
