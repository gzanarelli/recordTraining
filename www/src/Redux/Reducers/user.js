import { SET_TOKEN } from '../constants/userTypes'

const initialState = {
  token: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      const tmp = {
        token: action.value
      }
      console.log('Redux set: ', tmp)
      return tmp
    default:
      return state
  }
}

export default user
