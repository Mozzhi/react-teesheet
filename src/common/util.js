//获取指定form中的所有的<input>对象  
function getElements(formId) {  
  var form = document.getElementById(formId);  
  var elements = new Array();  
  var tagElements = form.getElementsByTagName('input');  
  for (var j = 0; j < tagElements.length; j++){ 
     elements.push(tagElements[j]); 
  
  } 
  return elements;  
}  
  
//获取单个input中的【name,value】数组 
function inputSelector(element) {  
 if (element.checked)  
   return [element.name, element.value];  
}  
    
function input(element) {  
  switch (element.type.toLowerCase()) {  
   case 'submit':  
   case 'hidden':  
   case 'password':  
   case 'text':  
    return [element.name, element.value];  
   case 'checkbox':  
   case 'radio':  
    return inputSelector(element);  
  }  
  return false;  
}  
  
//组合URL 
function serializeElement(element) {  
  var method = element.tagName.toLowerCase();  
  var parameter = input(element);  
   
  if (parameter) {  
   var key = encodeURIComponent(parameter[0]);  
   if (key.length == 0) return;  
   
   if (parameter[1].constructor != Array)  
    parameter[1] = [parameter[1]];  
      
   var values = parameter[1];  
   var results = [];  
   for (var i=0; i<values.length; i++) {  
    results.push(key + '=' + encodeURIComponent(values[i]));  
   }  
   return results.join('&');  
  }  
 }  
  
//调用方法   
export function serializeForm(formId) {  
  var elements = getElements(formId);  
  var queryComponents = new Array();  
   
  for (var i = 0; i < elements.length; i++) {  
   var queryComponent = serializeElement(elements[i]);  
   if (queryComponent)  
    queryComponents.push(queryComponent);  
  }  
   
  return queryComponents.join('&'); 
} 

// 深拷贝
export function coppyArray(arr){
   return arr.map((e)=>{
        if(typeof e==='object'){
           return Object.assign({},e);
         }else{
           return e;
       }
     }) 
 };

export function dateFormate(date) {

  let times = {
    day    : addZero(parseInt(date/60/60/24)),
    hour   : addZero(parseInt(date/60/60%24)),
    minute : addZero(parseInt(date/60%60)),
    second : addZero(parseInt(date%60))
  }
  
  return times;

}

// 小于10添加0；
export function addZero(num) {
  return  (num > 9) ? num : '0' + num;
}

// 
export function returnMD(date, f){
  let dates = new Date(date);
  console.log()
  let y = dates.getFullYear();
  let m = addZero(dates.getMonth() + 1);
  let d = addZero(dates.getDate());
  if(f == 'ymd'){
    return y+'-'+m+'-'+d;
  }else if(f == 'md'){
    return  m + '月' + d + '日';
  }else{
    return  m + '-' + d ;
  }
  
}

// 
export function returnTime(date){
  let dates = new Date(date);
  let h = addZero(dates.getHours());
  let minit = addZero(dates.getMinutes());

  return h + ':' + minit

}

// 
export function returnDay(date) {
  let dates = new Date(date);
  let day = dates.getDay();
  switch (day) {
    case 0: return '日'; break;
    case 1: return '一'; break;
    case 2: return '二'; break;
    case 3: return '三'; break;
    case 4: return '四'; break;
    case 5: return '五'; break;
    case 6: return '六'; break;
  }
}

export function GetQueryString (name, url) {
         let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         let r;
         if(url){
            r = ('?' + url.split('?')[1]).substr(1).match(reg);
         }else{
            r = window.location.search.substr(1).match(reg);
         }
          
         if(r!=null)return  unescape(r[2]); return null;
    }

// 全局分享
// export function wxOnMenuShareAppMessage(url) {
//   let that = this;
//   wx.onMenuShareAppMessage({
//         title: document.title, 
//         desc: '风神高尔夫俱乐部',
//         link: url, 
//         imgUrl: that.domain + '/static/theme/img/login/meisonglogo.png',
//         type: '', 
//         dataUrl: '', 
//         success: function () {
          
//         }
//       });
// };

// // 特殊页面分享
// export function wxOnMenuShareAppMessageSP(obj) {
//   let that = this;
//   wx.onMenuShareAppMessage({
//         title: obj.title, 
//         desc: obj.desc,
//         link: obj.url, 
//         imgUrl: obj.img,
//         type: '', 
//         dataUrl: '', 
//         success: function () {
          
//         }
//       });
// }

// 餐饮计算总价格
export function calculateTotalPrice(arr){
  let total_price = 0;
  for(let i = 0; i < arr.length; i++){
    total_price += arr[i].price * arr[i].amount;
  }

  return total_price;

}

// 餐饮计算总数
export function calculateHowMany(arr){
  let how_many = 0;
  for(let i = 0; i < arr.length; i++){
    how_many += arr[i].amount;
  }

  return how_many;

}

// 动态改变title

export function changeTitle(title){
  document.title = title;
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.getElementsByTagName('body')[0].appendChild(iframe);
      iframe.remove();
  iframe.onload = function(){
    setTimeout(function() {
        iframe.remove();
    }, 0);
  }
}

//
export function createArr(num){
    let newA = [];
    for(let i=1; i<=num; i++){
        newA.push(i);
    }
    return newA;
}