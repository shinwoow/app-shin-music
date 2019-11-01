const qs = require('qs')
import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'

let baseUrl = base.proUrl

if (process.env.NODE_ENV == 'development') {
  baseUrl = base.devUrl + '/music'
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = base.proUrl + '/music'
} else {
  baseUrl = base.devUrl + '/music'
}

const music = {

  getMusicList() {
    return axios.get(`${baseUrl}/getMusicList`)
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
  },
  //文件上传
  uploadFile(files) {
    const param = new FormData();
    files.forEach(file => {
      param.append("file", file.file, file.file.name);
    });
    // param.append("file", file.file, file.file.name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(`${baseUrl}/uploadFilds`, param, config);
  }

}

export default music
