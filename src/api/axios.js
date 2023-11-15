import axios from 'axios'

const requests = axios.create({
  timeout: 5 * 1000,
  retry: 3 // 设置全局重试请求次数（最多重试几次请求）
})

requests.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

requests.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          break
        case 402:
          break
        case 500:
          break
        case 502:
          break
        default:
          console.error(err)
          break
      }
      return Promise.reject(err.response.data)
    }
  }
)

export default requests
