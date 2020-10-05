import axios from 'axios'
import configStore from '../Redux/configStore'
import _ from 'lodash'
import errors from '../utils/errors'

const { store } = configStore()

const instance = axios.create({
  crossdomain: true
})

instance.interceptors.request.use(function (config) {
  /**
   * Set verification and throw error
   */
  config.headers.token = store.getState().user.token
  return config
}, function (err) {
  console.log(err)
  return err
})

instance.interceptors.response.use(function(response) {
  console.log('Response: ', response)
  return response
}, function(error) {
  console.log(localStorage)
	if (_.get(error, 'response.status') === 401) {
    localStorage.removeItem('persist:record_redux')
    window.location.reload()
  } else if (_.get(error, 'response.status') < 500) {
    console.log('other error')
  } else {
    localStorage.removeItem('persist:record_redux')
  }
	return null
})

export default instance
