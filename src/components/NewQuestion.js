import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import NavBar from './NavBar'
import { _saveQuestion } from '../utils/_DATA'
import { addQuestion } from '../actions/questions'
import { updateUser } from '../actions/users'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toDashboard: false,
    loggedIn: false,
    validated: true
  }

  componentWillMount(){
    if (this.props.authedUser != null) {
      this.setState({
        loggedIn: true
      })} else {
        this.setState({
          loggedIn: false
        })
      }
  }


  addQuestion = (e, user) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    if (optionOne && optionTwo !== '')
{    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: user
    }).then((question) => {
      this.props.dispatch(addQuestion(question))
      this.props.dispatch(updateUser(user, question.id))
      this.setState({
        toDashboard: true
      })
    }
  )} else {
    this.setState({
      validated: false
    })
  }
  }

  handleChange = (event, option) => {
    this.setState({
      [option]: event.target.value
    })
  }

  render() {
    if ( this.state.toDashboard ) {
      return <Redirect to='/home'/>
    } else if (this.state.loggedIn) {
    return (
      <div>
        <NavBar></NavBar>
        <Form>
          <h3>Would You Rather?</h3>
          <FormGroup>
            <Label for='optionOne'>First Option</Label>
            {this.state.validated ? null: <div>You must enter two options.</div>}
            <Input type='text' name='optionOne' id='optionOne' placeholder='Insert First Option Here' onChange={(event) => this.handleChange(event, 'optionOne')}/>
          </FormGroup>
          <FormGroup>
            <Label for='optionOne'>Second Option</Label>
            {this.state.validated ? null: <div>You must enter two options.</div>}
            <Input type='text' name='optionTwo' id='optionTwo' placeholder='Insert Second Option Here' onChange={(event) => this.handleChange(event, 'optionTwo')}/>
          </FormGroup>
          <Button color='info' onClick={(e) => this.addQuestion(e, this.props.authedUser.id)}>
            Add Question
          </Button>
        </Form>
      </div>
    );
  } else {
    return <Redirect to={{pathname: '/', state: {path: this.props.location.pathname }}}/>
  }
}
  }

function mapStateToProps ({authedUser , users}) {
  return {
  authedUser: authedUser,
  users: users
  }
}

export default connect(mapStateToProps)(NewQuestion)
