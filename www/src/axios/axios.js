import axios from 'axios'

const instance = axios.create({
  crossdomain: true
})

instance.interceptors.request.use(function (config) {
  // create set header withz
  return config
}, function (err) {
  console.log(err)
  return err
})

export default instance
