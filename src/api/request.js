import axios from 'axios'
import store from '@/store'
import router from '../router'
import { baseURL } from '@/config'
import { Message, MessageBox } from 'element-ui'


// 关闭全局的loading
function closeGlobalLoading() {
  if (store.getters.globalLoading) {
    store.commit('SET_GLOBAL_LOADING', false)
  }
}
// 弹出错误提示
function showErrMsg(errorMsg) {
  Message({
    showClose: true,
    message: errorMsg,
    type: 'error'
  });
}
// 打印错误提示
function errorLog(data, config) {
  let errorObj = {
    url: config.url,
    code: data.code,
    msg: data.message,
  }
  config.params && (errorObj.params = config.params);
  config.data && (errorObj.data = JSON.parse(config.data));
  console.log(errorObj);
}


// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 20000,
})

let flag = true;

// 请求 拦截器
ajax.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['x-access-token'] = store.getters.token
  }
  return config;
}, error => {
  console.log('请求拦截器', error)
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  setTimeout(() => {
    closeGlobalLoading()
  }, 500)
  const { data } = response
  if (data.code === 0 || data.code === 8888) {
    return response.data.data
  } else {
    let errorMsg = data.message
    if (data.code === 40000 || data.code === 30003 && flag) {
      store.dispatch('logoutAct')
      flag = false
      MessageBox.alert(errorMsg, '警告', {
        confirmButtonText: '确定',
        callback: () => {
          router.push("/login")
          flag = true
        }
      });
    } else {
      showErrMsg(errorMsg)
    }
    errorLog(data, response.config)
    return Promise.reject(errorMsg)
  }

}, error => {
  closeGlobalLoading()
  let errorMsg = error.message
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
  } else {
    // 服务器没有响应
    console.log('server', errorMsg);
  }
  showErrMsg(errorMsg)
  return Promise.reject(errorMsg)
});
export default ajax;
