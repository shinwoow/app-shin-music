const axios = require('axios')
const qs = require('qs')


import {
  Toast
} from 'vant'
import store from '@/store/index'
import router from '../router'
import base from '@/api/base'

//创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
})

if (process.env.NODE_ENV == 'development') {
  instance.defaults.baseURL = base.devUrl
} else if (process.env.NODE_ENV == 'production') {
  instance.defaults.baseURL = base.proUrl
} else {
  instance.defaults.baseURL = base.devUrl
}

//设置post请求默认请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8

/**
 * 提示函数
 * 禁止点击遮罩层，1s后消失
 * **/
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: ture
  })
}

/**
 * 跳转登录页
 * 携带当前路由地址，便于返回
 * **/
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败统一处理
 * @param [Number] status [请求失败的状态码]
 * **/
const errorHandle = (status, other) => {
  switch (status) {
    /**
     * 401: 未登录
     * 未登录则跳转到登录界面
     * 登录成功在跳转到当前界面
     * **/
    case 401:
      toLogin()
      break
      /**
       * 403: token过期
       * 提示用户
       * 清楚localStorage和vuex中的token
       * 跳转登录界面
       * **/
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      store.commit('loginSucess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
      /**
       * 404: 请求失败
       * 提示错误
       * 跳转到error界面
       * **/
    case 404:
      tip(网络请求不存在)
      router.replace({
        path: '/error',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      /**
       * 其他错误
       * 直接抛出错误提示
       * **/
    default:
      console.log(other)
  }
}

/**
 * 请求拦截
 * **/
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

//响应拦截器
instance.interceptors.response.use(
  //请求成功
  response => {

    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response)

  },
  //请求失败
  error => {
    const {
      response
    } = error
    //响应状态不为2的情况
    if (response) {
      //请求已发出，但不为2
      errorHandle(response.status, response.data.message)
      return Promise.reject(response);
    } else {
      //处理断网情况
      store.commit('changeNetwork', false)
    }
  }
)


/**
 * 封装get和post请求
 * **/


/**
 * get
 * @param [String] url [请求的url地址]
 * @param [Object] params [请求时携带的参数]
 * **/
export function get(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch((err) => {
      reject(err.data)
    })
  })
}

/**
 * post
 * @param [String] url [请求的url地址]
 * @param [Object] params [请求时携带的参数]
 * **/
export function post(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params))
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err.data)
      })
  })
}

export default instance
