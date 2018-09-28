import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { Progress, Button } from 'reactstrap'
import { _saveQuestionAnswer } from '../utils/_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { _getUsers, _getQuestions } from '../utils/_DATA'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from '@material-ui/core/Avatar';
import { Redirect, withRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import ErrorCatch from './ErrorCatch'


class Question extends Component {


  state = {
    answered: false,
  }

componentDidMount() {
  if (this.props.authedUser != null){
    const questionId = this.props.match.params.questionId
    if (this.props.error == null && this.props.questions[questionId] != null){

      const optionOneVotes = this.props.questions[questionId].optionOne.votes
      const optionTwoVotes = this.props.questions[questionId].optionTwo.votes
      this.check_vote(this.props.authedUser, optionOneVotes, optionTwoVotes)
    }
  }
}

  calculate_percent = (votesOne, votesTwo, value) => {
    let percent = 0
    if (value === 'one') {
      percent = votesOne/(votesOne + votesTwo) * 100
    } else {
      percent = votesTwo/(votesOne + votesTwo) * 100
    }
    return Math.round(percent.toString())
  }

  check_vote = (user, oneVotes, twoVotes) => {
    if ( oneVotes.includes(user.id) | twoVotes.includes(user.id)) {
      this.setState({
        answered: true
      })
  }}

  answer_question = (event, user, qid, answer, optionOneVotes, optionTwoVotes) => {
    const { dispatch } = this.props
    if (this.state.answered) {
      alert('You can only answer a question one time.')
  } else {
    _saveQuestionAnswer(user, qid, answer).then(_getUsers().then(users => {
          console.log(`answer saved for ${qid}`)
          dispatch(receiveUsers(users))
        })).then(_getQuestions().then(questions => {
          dispatch(receiveQuestions(questions))
          dispatch(setAuthedUser(this.props.users[user]))
          if (answer === 'optionOne') {
            optionOneVotes.push(user)
          } else {
            optionTwoVotes.push(user)
          }
          this.setState({
            answered: true
          })
          }
        ))
  }
  }

  check_user_answer = (option, qid) => option === 'one' ?
    (this.props.questions[qid].optionOne.votes.includes(this.props.authedUser.id))
    :
    (this.props.questions[qid].optionTwo.votes.includes(this.props.authedUser.id))


  render() {
    console.log(this.props.error)
      if (this.props.authedUser != null){
      const questionId = this.props.match.params.questionId
      if (this.props.error == null && this.props.questions[questionId] != null) {
      const optionOneVotes = this.props.questions[questionId].optionOne.votes
      const optionTwoVotes = this.props.questions[questionId].optionTwo.votes
      return(
        <div>
          <NavBar />
          <Avatar src={this.props.users[this.props.questions[questionId].author].avatarURL} />
          <div>{this.props.questions[questionId].author } asked "Would you rather"?</div>
          <Button color={ this.check_user_answer('one', questionId) ? 'success':'info'} onClick={(e) => this.answer_question(e, this.props.authedUser.id, questionId,
            'optionOne', optionOneVotes, optionTwoVotes)} disabled={this.state.answered}>
            { this.state.answered ?
              <div>
                {this.props.questions[questionId].optionOne.text}
                <Progress color="primary"
                  value={this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'one')}>
                  {this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'one') + '%'}
                </Progress>
                <div>{this.check_user_answer('one', questionId) ? 'Your Answer':''}   Votes: {optionOneVotes.length}</div>
              </div>
                : this.props.questions[questionId].optionOne.text }

          </Button>
          <Button
            color={this.check_user_answer('two', questionId) ? 'success':'info'}
            onClick={(e) => this.answer_question(e, this.props.authedUser.id, questionId,
                      'optionTwo', optionOneVotes, optionTwoVotes)}
            disabled={this.state.answered}>
            {  this.state.answered ?
                <div>
                  {this.props.questions[questionId].optionTwo.text}
                <Progress color="primary"
                  value={this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'two')}>
                  {this.calculate_percent(optionOneVotes.length, optionTwoVotes.length, 'two') + '%'}
                </Progress>
                <div>{this.check_user_answer('two', questionId) ? 'Your Answer':''}   Votes: {optionTwoVotes.length}</div>
                </div>
                 : this.props.questions[questionId].optionTwo.text }
          </Button>
      </div>
    )
    } else {
      return <div>Could not find this question. Please try again.</div>
    }}
 else {
  return <Redirect to={{ pathname: '/', state: {path: this.props.location.pathname} }} />
}
}
}

function mapStateToProps ({ questions, authedUser, users }) {

    return {
      users: users,
      questions: questions,
      authedUser: authedUser,
    }
  }


export default connect(mapStateToProps)(Question)
