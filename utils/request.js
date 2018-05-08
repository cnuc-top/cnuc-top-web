import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/',
  timeout: 15000 // 请求超时时间
})

service.interceptors.response.use(
  response => {
    const res = response
    const { status } = res

    if (status === 200) {
      const { message } = response.data

      if (message) {
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      return response.data
    } else if (status === 204) {
      Message({
        message: '无内容',
        type: 'warning',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
