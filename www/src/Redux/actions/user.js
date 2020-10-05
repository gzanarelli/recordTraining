import * as types from '../constants/userTypes'

export const setToken = value => ({ type: types.SET_TOKEN, value })
export const removeToken = (value = null) => ({ type: types.REMOVE_TOKEN, value })
