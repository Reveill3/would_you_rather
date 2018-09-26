import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import ErrorCatch from './ErrorCatch'
import Leaderboard from './Leaderboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    {if (this.props.authedUser != null){
      return (
          <Router>
            <ErrorCatch>
              <div>
                <Switch>
                  <Route path='/' exact component={Login}/>
                  <Route path='/home'  component={Dashboard}/>
                  <Route path='/question/:questionId'  component={Question}/>
                  <Route path='/add'  component={NewQuestion}/>
                  <Route path='/leaderboard' component={Leaderboard}/>
                </Switch>
              </div>
            </ErrorCatch>
          </Router>
        )
            } else {
                return (
              <Router>
                <ErrorCatch>
                  <div>
                  <Switch>
                    <Route path='/' exact component={Login}/>
                    <Redirect to='/'/>
                  </Switch>
                </div>
              </ErrorCatch>
            </Router>
              )
            }
          }
      }
    }

function mapStateToProps ({authedUser}) {
  return {
    authedUser: authedUser
  }
}


export default connect(mapStateToProps)(App)
