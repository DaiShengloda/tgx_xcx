/**
 * 各种弹窗提示
 * @author 曹杰
 */

function alert(title) {
  wx.showToast({
    title: title,
    mask: true,
    icon: 'none'
  })
}

function error(title) {
  wx.showToast({
    title,
    mask: true,
    image: '/static/images/close.png'
  })
}

function success(title){
  wx.showToast({
    title,
    mask:true,
    icon:'success'
  })
}

// 展示loading
function showLoading(title) {
  wx.showLoading({
    title: title || '加载中',
    mask: true
  })
}

// 隐藏loading
function hideLoading() {
  wx.hideLoading()
}

module.exports = {
  alert: alert,
  error,
  success,
  showLoading: showLoading,
  hideLoading: hideLoading
}
