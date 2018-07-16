/* 
* @Author: anchen
* @Date:   2017-10-27 10:27:37
* @Last Modified by:   mozzhi
* @Last Modified time: 2018-07-09 19:32:58
*/
import axios from 'axios';
var WechatUtil = {
  URL_CONFIG: 'WechatJSSDK',
  isWechatReady: false,
  isWechatError: false,
  appId: 'wxe9def2d962a83a47', // 给个默认的，读取到后重新赋值
  shareImageUrl: '',
  readyFunctionArray: [],
  init (currentUrl, cb) {
    axios.get(WechatUtil.URL_CONFIG,{
      params: {url: currentUrl, debug: true}
    })
    .then((response) => {
      var obj = response.data
      if (obj.code !== 0 ) {
        console.log(obj.msg)
        return
      }
      WechatUtil.appId = obj.data.appId
      window.wx.config({
        debug: false,
        appId: obj.data.appId,
        timestamp: obj.data.timestamp,
        nonceStr: obj.data.nonceStr,
        signature: obj.data.signature, 
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      })
      window.wx.ready(function () {
        WechatUtil.isWechatReady = true;
        if(cb && typeof cb === 'function'){cb()}
        while (WechatUtil.readyFunctionArray.length > 0) {
          var fn = WechatUtil.readyFunctionArray.shift()
          if (fn && typeof fn === 'function') {
            fn()
          }
        }
      })
      window.wx.error(function () {
        WechatUtil.isWechatError = true
      })
    }, (response) => {})
  },
}

export default WechatUtil;
