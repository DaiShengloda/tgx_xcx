const KEY = 'sessionId';
function setSessionId(sessionId){
  wx.setStorageSync(KEY,sessionId);
}

function getSessionId(){
  return wx.getStorageSync(KEY);
}

function removeSessionId(){
  wx.removeStorageSync(KEY);
}

export default{setSessionId,getSessionId,removeSessionId}