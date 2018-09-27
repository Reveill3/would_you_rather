import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { PowerSettingsNew } from '@material-ui/icons';


class UserDisplay extends Component {

  handleLogOut = () => {
      const { dispatch } = this.props
      dispatch(setAuthedUser(false))
  }

  render() {
    return(
      <div className='col-4'>
        { this.props.authedUser ?
          <div className='row'>
          <div className='pr-3'>Hello, { this.props.authedUser.name }</div>
          <NavLink className='pl-3' to='/' onClick={ this.handleLogOut }>
            <PowerSettingsNew />
          </NavLink>
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
