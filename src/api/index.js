import axios from 'axios';

axios.defaults.baseURL = 'http://teesheet.dev.baigolf.com/api/'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Authorization'] = 'jwt ' + (localStorage.getItem('token') || '');

export { axios };

