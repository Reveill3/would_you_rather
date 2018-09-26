import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Scorecard from './Scorecard'


class Leaderboard extends Component {

  calculateScore = (user) => {
  const  answersCount = Object.keys(this.props.users[user].answers).length
  const questionsCount = this.props.users[user].questions.length
  return answersCount + questionsCount
  }

  render() {
return (
  <div>
    <NavBar/>
    <h3>Leaderboard</h3>
    {Object.keys(this.props.users).sort((a,b) => this.calculateScore(b) - this.calculateScore(a)).map(user => (<Scorecard key={this.props.users[user].id}
      userid={this.props.users[user].id} />))}
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

export default connect(mapStateToProps)(Leaderboard)
