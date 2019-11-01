const qs = require('qs')
import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'

let baseUrl = ''
if (process.env.NODE_ENV == 'development') {
  baseUrl = base.devUrl + '/user'
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = base.proUrl + '/user'
} else {
  baseUrl = base.devUrl + '/user'
}

const user = {

  // creatUser = p => post('/user/creatUser', p),//创建新用户
  // getUser = p => get('/user', p)//创建新用户

  getUser() {
    return axios.get(`${baseUrl}/user`)
  },
  // 新闻详情,演示    
  getUserDetail(id, params) {
    return axios.get(`${baseUrl}/user/${id}`, {
      params: params
    });
  },
  // post提交    
  login(params) {
    return axios.post(`${baseUrl}/accesstoken`, qs.stringify(params));
  }

}

export default user
