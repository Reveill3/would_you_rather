import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Scorecard from './Scorecard'
import { Redirect } from 'react-router-dom'


class Leaderboard extends Component {

  state = {
    loggedIn: false
  }

  componentWillMount(){
    if (this.props.authedUser != null) {
      this.setState({
        loggedIn: true
      })} else {
        this.setState({
          loggedIn: false
        })
      }
  }

  calculateScore = (user) => {
  const  answersCount = Object.keys(this.props.users[user].answers).length
  const questionsCount = this.props.users[user].questions.length
  return answersCount + questionsCount
  }

  render() {
    console.log(this.state)
    if (this.state.loggedIn) {
      return (
        <div>
          <NavBar/>
          <h3>Leaderboard</h3>
          {Object.keys(this.props.users).sort((a,b) => this.calculateScore(b) - this.calculateScore(a)).map(user => (<Scorecard key={this.props.users[user].id}
            userid={this.props.users[user].id} />))}
        </div>
      )
    } else {
      return <Redirect to={{pathname: '/', state: {path: this.props.location.pathname }}}/>
    }
}
}

function mapStateToProps ({ authedUser, users })  {
 return {
   authedUser: authedUser,
   users: users
 }
}

export default connect(mapStateToProps)(Leaderboard)
