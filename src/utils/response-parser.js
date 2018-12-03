/**
 * 请求响应解析工具
 * @author 曹杰
 */
import window from './window-util.js'
import userManager from './user-manager.js'
import sessionUtil from './session-util.js'
import LogFactory from './log-util.js'
import { subjects } from '../const';
import wepy from 'wepy';
var Logger = LogFactory.getLogger('http-response-parser')

export default function (response) {
  let { data, statusCode } = response
  // 请求失败
  if (statusCode != 200) {
    return Promise.reject('网络异常');
  }
  if(typeof data == 'string'){
    data = JSON.parse(data);
  }
  if (data.sessionId) {
    sessionUtil.setSessionId(data.sessionId);
  }
  // 需要登录的操作，跳转登录页面
  if (data.errcode == '100') {
    //获取当前页面,当登录完成之后,重定向到此页面
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let { route, options } = currentPage;
    let queryString = '';
    for (let [k, v] of Object.entries(options)) {
      queryString += `${k}=${v}&`;
    }
    let url = '/' + route;
    if (queryString) {
      queryString.substr(0, queryString.length - 1);
      url += '?' + queryString;
    }
    let app = wepy.$instance;
    let observer = app.observer;
    observer.subscription(subjects.loginSuccess,async function () {
      try {
        await wepy.navigateTo({url});
      } catch (error) {
        await wepy.switchTab({url});
      }
      observer.subscription(subjects.loginSuccess,function(){
        wepy.switchTab({url:'/pages/tabBar/userCenter'});
      });
    });
    console.log(`current_page>>> ${url}`);
    wx.navigateTo({ url: '/subPages/user/pages/login?type=2' });
    //强制中断后续操作
    throw new Error("用户需要登录");
  } else {
    // session 状态
    var sessionStatus = data.sessionStatus
    // 当前用户已经失效,静默登录
    if (sessionStatus == '0') {
      userManager.loginByAuth()
    }
    if (data.errcode == '-1') {
      //服务器异常
      return Promise.reject(data);
    } else if (data.status == '0') {
      // 业务失败,交由后续处理
      return Promise.reject(data)
    }
    return Promise.resolve(data.data)
  }
}
