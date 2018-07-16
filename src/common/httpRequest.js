// 定义全局需要用到token验证的请求方法（对axios的二次封装）。

function returnRequestMethods(that,obj){

    let methods = obj.methods || 'get',
    params = obj.params || {};

    methods = methods.toLowerCase();

    if(methods == 'get'){

        return that.$http.get(obj.url,{
            params: params
        })

    }else if(methods == 'delete'){

        return that.$http.delete(obj.url,{
            params: params
        })

    }else if(methods == 'post'){

        return that.$http.post(obj.url, params)

    }else if(methods == 'put'){

        return that.$http.put(obj.url, params)

    }
}


let HttpRequest = function(obj){
    let that = this;    
    returnRequestMethods(that,obj)
    .then((res) => {
        if(res.data.code == -310 || res.data.code == -283 || res.data.code == -282){
          localStorage.clear();
          let rex = /\?.*\#/;
          let redirect_url = encodeURIComponent(window.location.href.replace(rex, '#'));
          // window.location.replace('/api/ThirdOAuth?redirect_url='+ redirect_url);
          window.location.replace('https://w.baigolf.com/wx_oauth.php?redirect_url='+ redirect_url +'&wx_config_id=wechat_pay&oauth_scopes=snsapi_userinfo');
          return;
        }else if(res.data.code == 0){
          typeof obj.callback == 'function' && obj.callback(res.data);
        }else if(res.data.code == -309 || res.data.code == -217){ 
            // 217 =》 时段未配置
            // 309 =》 无效的头部信息
          
        }else if(res.data.code == -334){ //球位选择页面需提前X小时预订
          that.$alert(res.data.msg);
        }else if(res.data.code == -401){ //虚假店铺信息
          that.$router.go(-1);
        }else{
            typeof obj.fail == 'function' && obj.fail(res);
          that.$toast(res.data.msg);
        }
    })
    .catch((err) => {
        console.log(err);
        
    })
}

export default HttpRequest;