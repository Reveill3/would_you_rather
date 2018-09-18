import { setAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { _getUsers, _getQuestions } from '../utils/_DATA'


export function handleInitialData () {
  return (dispatch) => {
    _getUsers().then(users => {
      dispatch(receiveUsers(users))
    })
    _getQuestions().then(questions => dispatch(receiveQuestions(questions)))
  }
}
