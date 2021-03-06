import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview  from './QuestionPreview'
import NavBar from './NavBar'
import { Button } from 'reactstrap'


class Dashboard extends Component {


  state = {
    view: 'unanswered',
  }


  handleToggle = (e) => {
    if (e.target.value === 'answered') {
      this.setState({
        view: 'answered'
      })
    } else {
      this.setState({
        view: 'unanswered'
      })
    }
  }

  render() {
    const { authedUser, questions } = this.props
    let unanswered_questions = Object.keys(questions)
    return(
      <div>
        <NavBar/>
        <Button color={this.state.view === 'answered' ? 'success':'info'} onClick={ this.handleToggle } value='answered'>Answered Questions</Button>
        <Button color={this.state.view === 'unanswered' ? 'success':'info'} onClick={ this.handleToggle } value='unanswered'>Unanswered Questions</Button>
        { this.state.view === 'answered' ?
          Object.keys(authedUser.answers).sort((a,b) => questions[a].timestamp - questions[b].timestamp).map(id => {
            return <QuestionPreview key={id} qid={id} classes={this.styles}/>
          }
        ): ( Object.keys(authedUser.answers).sort((a,b) => questions[a].timestamp - questions[b].timestamp).map(aid => {
              unanswered_questions = unanswered_questions.filter(qid => qid !== aid)
      }),
      unanswered_questions.map(id => <QuestionPreview key={id} qid={id}/> )

    )
    }
      </div>
  )
}
}

function mapStateToProps ({ authedUser, questions, users }) {
    return {
      users: users,
      authedUser: authedUser,
      questions: questions
    }
  }

export default connect(mapStateToProps)(Dashboard)
