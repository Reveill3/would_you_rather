import React, { Component } from 'react'
import Question from './Question'


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
          <Question error='true'/>
        </div>
      )
    } else {
      return this.props.children
  }}
}

export default ErrorCatch
