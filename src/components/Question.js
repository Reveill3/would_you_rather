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

  render() {
    const optionOneVotes = this.props.questions[this.props.match.params.questionId].optionOne.votes.length
    const optionTwoVotes = this.props.questions[this.props.match.params.questionId].optionTwo.votes.length
    const { questions } = this.props
    const { questionId } = this.props.match.params
    return(
        <div>
          <NavBar />
          <div>{questions[questionId].author } asked "Would you rather"?</div>
          <Progress color="success" value={this.calculate_percent(optionOneVotes, optionTwoVotes, 'one')}>{questions[questionId].optionOne.text}</Progress>
          <Progress color="success" value={this.calculate_percent(optionOneVotes, optionTwoVotes, 'two')}>{questions[questionId].optionTwo.text}</Progress>
        </div>
  )
}
}

function mapStateToProps ({ questions, authedUser }) {
    return {
      questions: questions
    }
  }


export default connect(mapStateToProps)(Question)
