import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'flex.css/dist/data-flex.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import 'lib-flexible';
import { GetQueryString } from './common/util';
import { HttpRequest } from './api';
import Toast , { T } from 'react-toast-mobile';
import 'react-toast-mobile/lib/react-toast-mobile.css';

let jwtToken = localStorage.getItem('token');
if(!jwtToken || jwtToken === null) {
    let code = GetQueryString('code',window.location.href);
    if(!code){
        let rex = /\?.*\#/;
        let redirect_url = encodeURIComponent(window.location.href.replace(rex, '#'));
        window.location.replace('https://w.baigolf.com/wx_oauth.php?redirect_url='+ redirect_url +'&wx_config_id=wechat_pay&oauth_scopes=snsapi_userinfo');
    }else {
        HttpRequest({
            url: 'OAuth',
            methods: 'post',
            params: {
                code: code,
                type: 2
            },
            callback: (res) => {
                if (res.code === 0) {
                    localStorage.setItem('token', res.data.authInfo.jwt);
                    // WechatUtil.init.call(Vue, window.location.href.split('#')[0]);
                    let nUrl = window.location.href.split('?')[0].replace('#', '?mark=1');
                    window.location.replace(nUrl);
                }
            }
        })
    }
}





ReactDOM.render(<div><Toast /><Router /></div>, document.getElementById('root'));
registerServiceWorker();
