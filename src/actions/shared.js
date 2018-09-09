import { setAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

import { _getUsers, _getQuestions } from '../utils/_DATA'

const AUTHED_USER = 'johndoe'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(setAuthedUser('alester'))
  }
}
