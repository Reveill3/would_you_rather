import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navs  from './Nav'


class UserDisplay extends Component {
  render() {
    return(
      <div>
        { this.props.authedUser ?
          <div>Hello, { this.props.authedUser.name }</div>:
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
