import { RECEIVE_USERS } from '../actions/users'
import { UPDATE_USER } from '../actions/users'


export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

      case UPDATE_USER:
        return {
          ...state,
          [action.user]: {
            ...state[action.user],
            questions: [...state[action.user].questions, action.question]
          }
        }
      default:
        return state
  }


}
