import axios from 'axios';

axios.defaults.baseURL = 'http://teesheet.dev.baigolf.com/api/'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Authorization'] = 'jwt ' + (localStorage.getItem('token') || '');

// 定义全局需要用到token验证的请求方法（对axios的二次封装）。
function returnRequestMethods(obj){
    let methods = obj.methods || 'get',
        params = obj.params || {};

    methods = methods.toLowerCase();

    if(methods === 'get'){

        return axios.get(obj.url,{
            params: params
        })

    }else if(methods === 'delete'){

        return axios.delete(obj.url,{
            params: params
        })

    }else if(methods === 'post'){

        return axios.post(obj.url, params)

    }else if(methods === 'put'){

        return axios.put(obj.url, params)

    }
}


let HttpRequest = function(obj){
    returnRequestMethods(obj)
        .then((res) => {
            if(res.data.code === -310 || res.data.code === -283 || res.data.code === -282){
                localStorage.clear();
                let rex = /\?.*\#/;
                let redirect_url = encodeURIComponent(window.location.href.replace(rex, '#'));
                window.location.replace('https://w.baigolf.com/wx_oauth.php?redirect_url='+ redirect_url +'&wx_config_id=wechat_pay&oauth_scopes=snsapi_userinfo');
                return;
            }else if(res.data.code === 0){
                typeof obj.callback === 'function' && obj.callback(res.data);
            }else if(res.data.code === -309 || res.data.code == -217){
                // 217 =》 时段未配置
                // 309 =》 无效的头部信息

            }else if(res.data.code === -334){ //球位选择页面需提前X小时预订
                alert(res.data.msg);
            }else if(res.data.code === -401){ //虚假店铺信息
                // that.$router.go(-1);
            }else{
                typeof obj.fail === 'function' && obj.fail(res);
                // that.$toast(res.data.msg);
            }
        })
        .catch((err) => {
            console.log(err);
            alert(err.message)
        })
}



export { HttpRequest };

