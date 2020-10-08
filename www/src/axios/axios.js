import axios from 'axios'
import _ from 'lodash'
import ls from 'local-storage'
import { toast } from 'react-toastify'

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
  console.log('Error catch: ', error.response)
  if (error.response) {
    // Request made and server responded
    if (_.get(error, 'response.status') === 401) {
      ls.remove('token')
    }
    toast.error(_.get(error, 'response.data.message', 'Something went wrong.'))
  } else {
    // Something happened in setting up the request that triggered an Error
    ls.remove('token')
    toast.error(_.get(error, 'message', 'Something went wrong.'))
  }
  return error
})

export default instance
