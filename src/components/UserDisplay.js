import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navs  from './Nav'


class UserDisplay extends Component {
  render() {

    return(
      <div>
        <p>Hello, { this.props.authedUser }</p>
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
