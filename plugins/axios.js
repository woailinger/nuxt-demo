import Config from './config';
import Message from 'ant-design-vue/lib/message';
export default function ({ $axios, redirect}, inject) {
  const instance = $axios.create({
    baseUrl: Config.host,
    timeout: 60000,
    withCredentials: true, // default
  })
  const isNull = (obj) => {
    if (obj !== undefined && obj !== null) {
      for (let [key, value] of Object.entries(obj)) {
        if (typeof value == 'object' && !(value instanceof Date))
          isNull(value);
        if (typeof value != 'boolean' && !value && typeof value != 'number') {
          delete obj[key];
        }
      }
    }
  }
  // 请求头操作
  instance.interceptors.request.use(
    config => {
      // 剔除异常字段
      let _data = Object.assign({}, config.data);
      isNull(_data);
      config.data = _data;
      // 处理formdata
      // if (process.borwers) {
      //   if (config.data instanceof window.FormData) {
      //     config.headers['content-type'] = 'application/x-www-form-urlencoded';
      //   }
      // }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 处理返回结果
  instance.interceptors.response.use(
    res => {
      if (res.code === 0 ){
        return res.data
      } else {
        if(process.client) {
          Message.error(res.data.message)
        }
        return res.data
      }
    },
    error => {
      const status = error.response && error.response.status
      if (status === 401) {
        // 重定向到登录页面
        redirect('/login')
      } else if (status === 404) {
        redirect('/404')
      }
      return Promise.reject(error)
    }
  )

  inject('Server', instance)
}
