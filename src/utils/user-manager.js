import wepy from 'wepy';
import http from './http-util.js'
import { API_URL, domain } from '../const.js'
import sessionUtil from './session-util.js'
import logger from './log-util.js'
let Logger = logger.getLogger('user-manager')
import windowUtil from './window-util.js'

//存储auth信息的key
const AUTH_KEY = "auth";
const USER_INFO = "userInfo";
//是否正在登录,若正在登录则不重复请求
let isLogining = false;
/**
 * 用户信息管理
 * @author 曹杰
 */

// 手机号登录
async function loginByMobile(mobile, password) {
  let codeData = await _getWxCode();
  let code=codeData.code
  return http.getRequest(API_URL.LOGIN_BY_MOBILE, {
    mobile, password, code
  }).then(data => {
    loginSuccess(data);
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.reject(err);
  })
}

// 微信号登录
function loginByWeChat(userInfo) {
  if (isLogining) {
    while (isLogining);
  }
  isLogining = true;
  return getSessionKey().then(key => {
    return http.getRequest(API_URL.MINI_APP_LOGIN, {
      "key": key,
      "encryptedData": userInfo.encryptedData,
      "iv": userInfo.iv
    });
  }).then(data => {
    Logger.debug('根据code登录请求成功:result==%o', data);
    sessionUtil.setSessionId(data.sessionId);
    loginSuccess(data.user);
    return Promise.resolve(data);
  }).catch(err => {
    isLogining = false;
    wx.removeStorageSync("sessionKey");
    return Promise.reject(err);
  });
}

/**
 * 静默登录
 */
function loginByAuth() {
  if (isLogining) {
    return false;
  }
  let isLogOut = wx.getStorageSync('logout');
  if (isLogOut) {
    Logger.info("用户已退出登录,将不再自动登录");
    return false;
  }
  let auth = wx.getStorageSync(AUTH_KEY);
  if (!auth) {
    return false;
  }
  isLogining = true;
  http.getRequest(API_URL.LOGIN_BY_AUTH, {
    "auth": auth
  }).then(function (data) {
    loginSuccess(data);
  }).catch(err => {
    Logger.error('auth登录失败:%o', err);
    isLogining = false;
  });
}

// 获取本地存储用户信息
function getLocalUserInfo() {
  return wx.getStorageSync(USER_INFO);
}

//获取用户详情
function getUserDetail() {
  let isLoginSuccess = wx.getStorageSync('loginSuccess');
  if (!isLoginSuccess) {
    Logger.error('获取用户信息失败--当前登录状态失效');
    return Promise.reject();
  }
  return http.getRequest(API_URL.USER_DETAIL)
    .then(data => {
      return Promise.resolve(data);
    });
}

//获取用户登录方式 1手机号登录/3微信登录
function getLoginType() {
  return wx.getStorageSync('login_type');
}

//退出登录
function logout(fn) {
  wx.clearStorageSync();
  //设置登录状态为false,此时将不再自动登录
  wx.setStorageSync('logout', true);
  fn && fn();
}

//登录成功
function loginSuccess(userInfo) {
  wx.setStorageSync(USER_INFO, userInfo);
  //设置登录方式
  if (userInfo.loginType) {
    wx.setStorageSync('login_type', userInfo.loginType);
  }
  //设置token
  if (userInfo.to_ken) {
    wx.setStorageSync(AUTH_KEY, userInfo.to_ken);
  }
  try {
    wx.removeStorageSync('logout');
  } catch (err) { };
  wx.setStorageSync('loginSuccess', true);
  isLogining = false;
}

/**
 * 根据code换sessionKey
 */
async function requestSessionKey() {
  let codeData = await _getWxCode();
  let key = await http.getRequest(domain + '/api/mini_app/code2session.do', {
    code: codeData.code
  });
  wx.setStorageSync("sessionKey", key);
  return Promise.resolve(key);
}

/**
 * 获取sessionKey
 */
async function getSessionKey() {
  let key = wx.getStorageSync("sessionKey");
  if (!key) {
    return requestSessionKey();
  }
  try {
    await wepy.checkSession();
  } catch (error) {
    return requestSessionKey();
  }
  return Promise.resolve(key);
}

//获取微信code
async function _getWxCode() {
  return await wepy.login();
}

//触发接口拦截
function triggerIntercept() {
  return http.getRequest(API_URL.USER_DETAIL)
    .then(data => {
      return Promise.resolve(data);
    });
}

// 授权获取手机号
function getPhoneNumber(userInfo){
  var openId = wx.getStorageSync('openId')
  return requestSessionKey().then(key => {
    return http.getRequest(API_URL.GET_PHONE_NUMBER, {
      "key": key,
      "encryptedData": userInfo.encryptedData,
      "iv": userInfo.iv,
      "openId": openId
    })
  }).then(data => {
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.reject(err);
  })
}

module.exports = {
  loginByMobile: loginByMobile,
  loginByWeChat: loginByWeChat,
  loginByAuth: loginByAuth,
  getLocalUserInfo: getLocalUserInfo,
  getUserDetail: getUserDetail,
  logout: logout,
  checkSession:getSessionKey,
  getLoginType: getLoginType,
  _getWxCode:_getWxCode,
  triggerIntercept:triggerIntercept,
  getPhoneNumber:getPhoneNumber
}
