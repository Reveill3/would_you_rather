import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class QuestionPreview extends Component {

  render() {
    const { qid, questions } = this.props
    return(
      <NavLink to={`/question/${qid}`}>
        <Card className='card'>
          <CardContent>
            <Typography variant='headline' color="textPrimary">
              { questions[qid].author } asked "Would you rather"?
            </Typography>
            <Typography variant="body1" component="h4">
              {questions[qid].optionOne.text}
            </Typography>
            <Typography variant="body1" component="h4">
              {questions[qid].optionTwo.text}
            </Typography>
          </CardContent>
        </Card>
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
