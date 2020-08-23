import Config from './config';
import Message from 'ant-design-vue/lib/message';
export default function ({ $axios, redirect}, inject) {
  const instance = $axios.create({
    browserBaseURL: Config.browserBaseURL,  // 客户端请求
    baseURL: Config.baseURL,  // 服务端请求
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json; text/json; charset=utf-8',
      'Access-Control-Allow-Origin': 'ashago-api-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com'
    },
    withCredentials: false, // default
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
      // config.headers['content-type'] = 'application/json; text/json; charset=utf-8';
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
      if (res.data.code == 0 ){
        return res.data
      } else {
        if(process.client) {
          Message.error(res.data.msg)
        }
        return res.data
      }
    },
    error => {
      const status = error.response && error.response.status
      if (status === 401) {
        // 重定向到登录页面
        redirect('/login')
      } else {
        Message.error("服务器错误, 请联系管理员:info@ashago.com")
      }
      return Promise.reject(error)
    }
  )

  inject('Server', instance)
}
