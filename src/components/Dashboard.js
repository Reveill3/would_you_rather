import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview  from './QuestionPreview'
import NavBar from './NavBar'
import { setAuthedUser } from '../actions/authedUser'


class Dashboard extends Component {
  state = {
    view: 'unanswered'
  }

  componentDidMount(){
    const {authedUser, users} = this.props
    this.props.dispatch(setAuthedUser(users[authedUser.id]))
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
        <NavBar />
        <button onClick={ this.handleToggle } value='answered'>Answered Questions</button>
        <button onClick={ this.handleToggle } value='unanswered'>Unanswered Questions</button>
        { this.state.view === 'answered' ?
          Object.keys(authedUser.answers).map(id => {
            return <QuestionPreview key={id} qid={id}/>
          }
        ): ( Object.keys(authedUser.answers).map(aid => {
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
