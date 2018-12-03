/**
 * http 请求工具类
 * @author 曹杰
*/

import token from './request-token.js'
import sessionUtil from './session-util.js'
import wepy from 'wepy'


// get请求
function getRequest(url, param) {
  return doRequest({ url, method:'GET', data: param });
}

// post请求
function postRequest(url, param) {
  return doRequest({url,method:'POST',data:param});
}

/**
 * 发送请求
 */
function doRequest({
  url = '',
  method = 'GET',
  data = {},
  dataType = 'json',
  header = {}
} = {}) {
  // 校验参数
  if (!url) {
    throw new Error('请求的url不能为空或者空字符串')
  }
  //设置请求必须的请求头
  header = Object.assign({}, {
    'token': token.getToken(),
    'Cookie': "SESSION=" + sessionUtil.getSessionId(),
    'version':3.8,
  }, header)
  return wepy.request({ url, method, data, dataType, header });
}

export default {
  getRequest: getRequest,
  postRequest: postRequest
}
