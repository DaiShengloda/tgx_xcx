/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false
  }
        /**
         * 弹出提示框
         */

  static success(title, duration = 2000) {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      duration: duration
    })
  }
        /**
         * 弹出确认窗口
         * param
         * text string 内容
         * payload function/{} 回调
         * title string 标题
         * type 1/2 1=我知道了 2=确认/取消
         */
  static confirm(text, payload = {}, title = '提示', type = '1') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: type != '1',
        confirmText: type == '1' ? '我知道了' : '确定',
        confirmColor: '#000',
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    }).then(function(resolve) {
      resolve && typeof resolve === 'function' ? resolve(res) : ''
    }).catch(function(reject) {
      reject && typeof reject === 'function' ? reject(res) : ''
    })
  }
        /**
         * 弹出加载提示
         */
  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

    /**
     * 加载完毕
     */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  static share(titles, imageUrls, urls) {
    return {
      title: titles,
      path: urls,
      imageUrl: imageUrls,
      success: function(res) {
        Tips.success('分享成功')
      },
      fail: function(res) {
        alert('分享失败')
      }
    }
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
