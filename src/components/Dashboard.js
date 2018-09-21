import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview  from './QuestionPreview'


class Dashboard extends Component {
  state = {
    view: 'answered'
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
    const { authedUser } = this.props
    return(
      <div>
        <button onClick={ this.handleToggle } value='answered'>Answered Questions</button>
        <button onClick={ this.handleToggle } value='unanswered'>Unanswered Questions</button>
        { this.state.view === 'answered' ?
          Object.keys(authedUser.answers).map(id => {
            console.log(id);
            return <QuestionPreview key={id} qid={id}/>
          }
          )
      : <div>Unanswered List Here</div>
    }
      </div>
  )
}
}

function mapStateToProps ({ authedUser }) {
    return {
      authedUser: authedUser
    }
  }

export default connect(mapStateToProps)(Dashboard)
