import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'


class UserDisplay extends Component {

  handleLogOut = () => {
      const { dispatch } = this.props
      dispatch(setAuthedUser(false))
  }

  render() {
    return(
      <div>
        { this.props.authedUser ?
          <div>
          <div>Hello, { this.props.authedUser.name }</div>
          <NavLink to='/' onClick={ this.handleLogOut }>Logout</NavLink>
        </div>
          :
          <div></div>
    }
      </div>
  )
}
}

function mapStateToProps ({ authedUser }) {
    return {
      authedUser: authedUser
    }
  }

export default connect(mapStateToProps)(UserDisplay)
