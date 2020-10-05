import { SET_TOKEN, REMOVE_TOKEN } from '../constants/userTypes'

const initialState = {
  token: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.value
      }
    case REMOVE_TOKEN:
      return {
        token: action.value
      }
    default:
      return state
  }
}

export default user
