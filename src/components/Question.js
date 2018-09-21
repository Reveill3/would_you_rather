import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { Progress } from 'reactstrap'

class Question extends Component {

  calculate_percent = (votesOne, votesTwo, value) => {
    let percent = 0
    if (value == 'one') {
      percent = votesOne/(votesOne + votesTwo) * 100
    } else {
      percent = votesTwo/(votesOne + votesTwo) * 100
    }
    return percent.toString()
  }

  check_vote = (user, questionVotes) => {
    if (questionVotes.includes(user.id)) {
      return true
    } else {
      return false
    }
  }

  render() {
    const optionOneVotes = this.props.questions[this.props.match.params.questionId].optionOne.votes
    const optionTwoVotes = this.props.questions[this.props.match.params.questionId].optionTwo.votes
    const { questions } = this.props
    const { questionId } = this.props.match.params
    const check = <img src='https://vignette.wikia.nocookie.net/outlast/images/f/f0/Check_mark.png/revision/latest/scale-to-width-down/60?cb=20140422222819'/>
    return(
        <div>
          <NavBar />
          <div>{questions[questionId].author } asked "Would you rather"?</div>
          <Progress color="success" value={this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'one')}>{questions[questionId].optionOne.text}</Progress>
          { this.check_vote(this.props.authedUser, optionOneVotes) ? check : '' }
          <Progress color="success" value={this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'two')}>{questions[questionId].optionTwo.text}</Progress>
          { this.check_vote(this.props.authedUser, optionTwoVotes) ? check : '' }
        </div>
  )
}
}

function mapStateToProps ({ questions, authedUser }) {
    return {
      questions: questions,
      authedUser: authedUser
    }
  }


export default connect(mapStateToProps)(Question)
