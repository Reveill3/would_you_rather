import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionPreview extends Component {

  render() {
    const { qid, questions } = this.props
    console.log(this.props)
    return(
      <div>
        { questions[qid].author } asked would you rather?
      </div>
  )
}
}

function mapStateToProps ({ questions, authedUser }) {
    return {
      authedUser: authedUser,
      questions: questions
    }
  }


export default connect(mapStateToProps)(QuestionPreview)
