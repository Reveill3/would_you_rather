import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import  NavBar from './NavBar'
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route path='/' exact component={Login}/>
          <Route path='/home'  component={Dashboard}/>
        </div>
      </Router>
    );
  }
}

export default connect()(App)
