import axios from 'axios';

axios.defaults.baseURL = 'https://api.imjad.cn/pixiv/v2/'

export function tags(){
  return axios.get('/',{params:{
    type: 'tags',
    page: 1
  }})
}