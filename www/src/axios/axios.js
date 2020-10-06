import axios from 'axios'
import _ from 'lodash'
import ls from 'local-storage'

const instance = axios.create({
  crossdomain: true
})

instance.interceptors.request.use(function (config) {
  /**
   * Set verification and throw error
   */
  config.headers.token = ls('token')
  return config
}, function (err) {
  console.log(err)
  return err
})

instance.interceptors.response.use(function (response) {
  console.log('Response: ', response)
  return response
}, function (error) {
  if (_.get(error, 'response.status') === 401) {
    // localStorage.removeItem('persist:record_redux')
    ls('token')
    window.location.reload()
  } else if (_.get(error, 'response.status') < 500) {
    window.location.reload()
  } else {
    ls('token')
    window.location.reload()
  }
  return error
})

export default instance
