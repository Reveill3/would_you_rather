import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

class QuestionPreview extends Component {

  render() {
    const { qid, questions } = this.props
    return(
      <NavLink to={`/question/${qid}`}>
        <div>
          <div>{ questions[qid].author } asked "Would you rather"?</div>
          <span>{questions[qid].optionOne.text}</span>
          <span>{questions[qid].optionTwo.text}</span>
        </div>
      </NavLink>

  )
}
}

function mapStateToProps ({ questions, authedUser, users }) {
    return {
      authedUser: authedUser,
      questions: questions,
      users: users
    }
  }


export default connect(mapStateToProps)(QuestionPreview)
