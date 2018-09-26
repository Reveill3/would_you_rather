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


class Question extends Component {


  state = {
    answered: false,
  }


  questions  = this.props.questions
  questionId = this.props.match.params.questionId
  optionOneVotes = this.props.questions[this.questionId].optionOne.votes
  optionTwoVotes = this.props.questions[this.questionId].optionTwo.votes


componentDidMount() {
  this.check_vote(this.props.authedUser, this.optionOneVotes, this.optionTwoVotes)

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
            this.optionOneVotes.push(user)
          } else {
            this.optionTwoVotes.push(user)
          }
          this.setState({
            answered: true
          })
          }
        ))
  }
  }

  check_user_answer = (option) => option === 'one' ?
    (this.questions[this.questionId].optionOne.votes.includes(this.props.authedUser.id))
    :
    (this.questions[this.questionId].optionTwo.votes.includes(this.props.authedUser.id))


  render() {
      return( <div>
        <NavBar />
        <Avatar src={this.props.users[this.props.questions[this.questionId].author].avatarURL} />
        <div>{this.questions[this.questionId].author } asked "Would you rather"?</div>
        <Button color={ this.check_user_answer('one') ? 'success':'info'} onClick={(e) => this.answer_question(e, this.props.authedUser.id, this.questionId,
          'optionOne', this.optionOneVotes, this.optionTwoVotes)} disabled={this.state.answered}>
          { this.state.answered ?
            <div>
              {this.questions[this.questionId].optionOne.text}
              <Progress color="primary"
                value={this.calculate_percent(this.optionOneVotes.length, this.optionTwoVotes.length, 'one')}>
                {this.calculate_percent(this.optionOneVotes.length, this.optionTwoVotes.length, 'one') + '%'}
              </Progress>
              <div>{this.check_user_answer('one') ? 'Your Answer':''}   Votes: {this.optionOneVotes.length}</div>
            </div>
              : this.questions[this.questionId].optionOne.text }

        </Button>
        <Button
          color={this.check_user_answer() ? 'success':'info'}
          onClick={(e) => this.answer_question(e, this.props.authedUser.id, this.questionId,
                    'optionTwo', this.optionOneVotes, this.optionTwoVotes)}
          disabled={this.state.answered}>
          {  this.state.answered ?
              <div>
                {this.questions[this.questionId].optionTwo.text}
              <Progress color="primary"
                value={this.calculate_percent(this.optionOneVotes.length, this.optionTwoVotes.length, 'two')}>
                {this.calculate_percent(this.optionOneVotes.length, this.optionTwoVotes.length, 'two') + '%'}
              </Progress>
              <div>{this.check_user_answer() ? 'Your Answer':''}   Votes: {this.optionTwoVotes.length}</div>
              </div>
               : this.questions[this.questionId].optionTwo.text }
        </Button>
      </div>
)
}
}

function mapStateToProps ({ questions, authedUser, users }) {
    return {
      users: users,
      questions: questions,
      authedUser: authedUser
    }
  }


export default connect(mapStateToProps)(Question)
