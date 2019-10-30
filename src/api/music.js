const qs = require('qs')
import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'

let baseUrl = base.proUrl

if (process.env.NODE_ENV == 'development') {
  baseUrl = base.devUrl
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = base.proUrl
} else {
  baseUrl = base.devUrl
}

const music = {

  getMusic() {
    return axios.get(`${baseUrl}/music`)
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

export default music
