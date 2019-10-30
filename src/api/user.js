const qs = require('qs')
import axios from '@/utils/http'; // 导入http中创建的axios实例

const baseUrl = 'http://127.0.0.1:3000/api'

const user = {

  // creatUser = p => post('/user/creatUser', p),//创建新用户
  // getUser = p => get('/user', p)//创建新用户

  getUser() {
    return axios.get(`${baseUrl}/user`)
  },
  // 新闻详情,演示    
  getUserDetail (id, params) {        
    return axios.get(`${baseUrl}/user/${id}`, {            
        params: params        
    });    
},
// post提交    
login (params) {        
    return axios.post(`${baseUrl}/accesstoken`, qs.stringify(params));    
}

}

export default user
