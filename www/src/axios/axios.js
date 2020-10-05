import axios from 'axios'
import configStore from '../Redux/configStore'
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

export default instance
