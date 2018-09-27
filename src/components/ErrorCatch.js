import React, { Component } from 'react'
import Login from './Login'


class ErrorCatch extends Component {

  state = {
    hasError: false
  }

  componentDidCatch(error, info){
    this.setState({
      hasError: true
    })

  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Login error='true'/>
        </div>
      )
    } else {
      return this.props.children
  }}
}

export default ErrorCatch
