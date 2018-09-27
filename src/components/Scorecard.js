import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


class Scorecard extends Component {

  render() {
    const questionCount = this.props.users[this.props.userid].questions.length
    const answerCount = Object.keys(this.props.users[this.props.userid].answers).length
return (
  <div>
    <Card className='scorecard'>
    <Avatar src={this.props.users[this.props.userid].avatarURL} />
    <div className='details'>
      <CardContent className='content'>
        <Typography variant="headline">{this.props.users[this.props.userid].name}</Typography>
        <Typography variant="subheading" color="textSecondary">
        Questions: {questionCount}
        </Typography>
        <Typography variant="subheading" color="textSecondary">
        Answers: {answerCount}
        </Typography>
        <Typography variant="subheading" color="textSecondary">
        Score: {questionCount + answerCount}
        </Typography>
      </CardContent>
    </div>
  </Card>
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
