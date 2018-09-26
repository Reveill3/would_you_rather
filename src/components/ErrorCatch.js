import React, { Component } from 'react'


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
      return <div>We can't find what you are looking for. :/. Please return to the home page and try again.</div>
    } else {
      return this.props.children
  }}
}

export default ErrorCatch
