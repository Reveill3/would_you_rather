import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';


class Scorecard extends Component {

  render() {
    const questionCount = this.props.users[this.props.userid].questions.length
    const answerCount = Object.keys(this.props.users[this.props.userid].answers).length
return (
  <div>
    <Avatar src={this.props.users[this.props.userid].avatarURL} />
    <h1>{this.props.users[this.props.userid].name}</h1>
    <h3>Questions: {questionCount}</h3>
    <h3>Answers: {answerCount}</h3>
    <h2>Score: {questionCount + answerCount}</h2>
  </div>
)
}
}

function mapStateToProps ({ authedUser, users })  {
 return {
   authedUser: authedUser,
   users: users
 }
}

export default connect(mapStateToProps)(Scorecard)
