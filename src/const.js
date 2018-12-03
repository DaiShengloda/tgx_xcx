/**
 * 常量类
 * @author 曹杰
 */

// 接口域名  
// mobileRegister改校验接口、直播室socket地址
// const domain = 'http://tgs-api.lzyunying.com'
const domain = 'https://tgs.gp58.com'
// 接口地址
const API_URL = {
  // 活动管理列表
  ACT_ADS: '/api/mini_app/common/ads.do',
  // 是否绑定手机号
  BIND_PHONE: '/api/mini_app/isBindPhone.do',
  // 卡券
  CARD_ENABLE: '/api/user/card/enableList.do',
  CARD_DISABLE: '/api/user/card/disableList.do',
  // 首页主题
  INDEX_SET: '/api/index/set.do',
  // 首页大咖推荐
  INDEX_HOT: '/api/index/hot.do',
  // 推荐接口
  RECOMMEND: '/api/index/reccontent.do',
  //根据auth登录
  LOGIN_BY_AUTH: '/api/user/loginByAuth.do',
  //根据手机号登录
  LOGIN_BY_MOBILE: '/api/user/loginByMobile.do',
  //根据微信code登录
  MINI_APP_LOGIN: '/api/mini_app/login.do',
  //用户详情
  USER_DETAIL: '/api/user/detail.do',
  //查询大咖币
  QUERY_COIN: '/api/user/queryCoin.do',
  //补充推荐
  RECHARGE_RECOMMEND: '/api/rechargev2/recommend.do',
  //下单接口
  PAY_ORDER: '/api/mini_app/order.do',
  //使用接口
  PAY_RESULT: '/api/rechargev2/recharge.do',
  //大咖币使用记录
  COIN_RECHARGE_LOG: '/api/rechargev2/logs.do',
  //获取验证码
  GET_YZ_CODE: '/api/phone/sendCode.do',
  //检查手机号是否可用
  CHECK_MOBILE: '/api/user/checkMobile.do',
  //绑定手机号
  BIND_MOBILE: '/api/phone/bindMobile.do',
  //验证原手机号
  CHECK_OLD_MOBILE: '/api/phone/checkOldMobile.do',
  //获取原手机号信息
  GET_OLD_MOBILE: '/api/phone/bindInfo.do',
  //修改密码
  MODIFY_PWD: '/api/user/forgetPassword.do',
  //注册
  REGISTER: '/api/user/register.do',
  //收入记录
  INCOME_LOG: '/api/user/queryIncome.do',
  //消费记录
  CONSUME_LOG: '/api/user/queryConsume.do',
  //获取用户登记信息
  GET_USER_REGISTRATION: '/api/user/queryByUserid.do',
  //保存用户登记
  SAVE_USER_REGISTRATION: '/api/user/saveUserRegistration.do',
  //风险测评题目列表
  FXCP_LIST: '/api/answer/all.do',
  //提交风险测评
  FXCP_SUBMIT: '/api/answer/result.do',
  //风险测评确认
  FXCP_CONFIRM: '/api/answer/submit.do',
  //合规判断
  HG_CONFIRM: '/api/business/pay/confirmingOrder.do',
  //查询风险测评结果
  FXCP_RESULT: '/api/mini_app/fxcpResult.do',
  // 签到
  SIGN: '/api/user/sign/sign.do',
  // 签到详情
  SIGN_DETAIL: '/api/user/sign/detail.do',

  // 大咖列表
  DAKA_LIST: '/api/bigname/list.do',
  // 大咖详情
  DAKA_DETAIL: '/api/bigname/detail.do',
  // 关注大咖
  DAKA_NOTICE: '/api/bigname/notice.do',
  // 取消关注
  DAKA_CANCEL_NOTICE: '/api/bigname/cancel.do',

  // 问股列表
  QUESTION_LIST: '/api/question/list.do',
  // 问股详情
  QUESTION_DETAIL: '/api/question/detail.do',
  //问股列表
  CONSULT_LIST: '/api/question/list.do',
  //问股详情
  CONSULT_DETAIL: '/api/question/detail.do',
  // 问股点赞
  QUESTION_SATISFY: '/api/question/satisfy_set.do',
  // 问股使用
  QUESTION_PAY: '/api/businessv2/question/listen/pay.do',
  //问股提问
  QUESTION_ASK: '/api/mini_app/question_submit.do',
  //问股回答时间
  QUESTION_TIME: '/api/question/remind.do',

  // 系列列表
  SERIES_LIST: '/api/course/series/list.do',
  // 系列详情
  SERIES_DETAIL: '/api/course/series/detail.do',
  // 系列课程使用
  SERIES_PAY: '/api/businessv2/course/series/pay.do',
  // 课程列表
  COURSE_LIST: '/api/course/dk/list.do',
  // 课程详情
  COURSE_DETAIL: '/api/course/contentDetail.do',
  // 课程上的广告
  COURSE_ADS: '/api/course/ads.do',

  // 笔记列表
  NOTE_LIST: '/api/noteInterface/list.do',
  //问股使用
  CONSULT_PAY: '/api/businessv2/question/listen/pay.do',
  // 笔记详情
  NOTE_DETAIL: '/api/noteInterface/detail.do',
  // 笔记获取评论
  NOTE_COMMENT: '/api/noteInterface/queryComments.do',
  // 笔记点赞
  NOTE_SATISFY: '/api/noteInterface/satisfy_set.do',
  // 笔记使用
  NOTE_PAY: '/api/businessv2/note/pay.do',
  // 笔记评论点赞
  NOTE_COMMENT_SATISFY: '/api/noteInterface/setAgree.do',
  // 笔记发表评论
  NOTE_SAVE_COMMENT: '/api/noteInterface/saveComment.do',

  // app数据
  APP_INIT: '/api/silent/init.do',

  // 大盘预测2
  FORECAST_TO: '/api/forecastv2/detail.do',
  // 预测记录
  FORECAST_LOG: '/api/forecastv2/forecastLog.do',
  // 大盘预测评论列表
  FORECAST_COMMENT_LIST: '/api/forecastv2/commentList.do',
  // 参加预测
  FORECAST_DO: '/api/forecastv2/forecast.do',
  // 添加预测评论
  FORECAST_COMMENT: '/api/forecastv2/saveComment.do',
  // 预测评论点赞
  FORECAST_COMMENT_AGREE: '/api/forecast/agree.do',  

  // 研报列表
  REPORT_LIST: '/api/report/list.do',
  // 研报配置
  REPORT_CONFIG: '/api/report/config.do',
  // 热门研报列表
  REPORT_HOT_LIST: '/api/report/hot/list.do',
  // 热门研报详情
  REPORT_HOT_DETAIL: '/api/report/hot/detail.do',
  // 研报详情
  REPORT_DETAIL: '/api/report/detail.do',
  // 研报评论列表
  REPORT_COMMENT_LIST: '/api/report/commentList.do',
  // 研报发表评论
  REPORT_COMMENT_POST: '/api/report/comment.do',
  // 研报评论点赞
  REPORT_COMMENT_AGREE: '/api/report/commentAgree.do',

  // VIP专区
  VIP_ZONE: '/api/user/card/vipZone.do',
  // VIP专享策略组合
  VIP_GROUP_LIST: '/api/vip/invest/groupList.do',
  // 大咖月卡专享笔记列表
  VIP_NOTE: '/api/noteInterface/getMonthCardVIPNote.do',
  // VIP专享交流圈
  VIP_LIVE: '/api/user/card/vipLiveRoom.do',
  // VIP专享策略组合详情V2
  VIP_GROUP_INFO_TO: '/api/vip/invest/groupInfov2.do',
  // VIP投资组合历史战绩
  VIP_DETAIL_INFO: '/api/vip/invest/detailInfo.do',
  // VIP服务介绍
  VIP_SERVER_PAGE:'/api/stock/info/page.htm?name=ykvip',

  // 获取openid
  CODE_TO_OPENID: '/api/mini_app/code2openId.do',
  // 手机号授权
  GET_PHONE_NUMBER: '/api/mini_app/getPhoneNumber.do',
}

//解决Object.entries不兼容的问题
if (!Object.entries
  || typeof Object.entries !== 'function') {
  Object.entries = function (obj) {
    let objData = [];
    for (let k in obj) {
      objData.push([k, obj[k]]);
    }
    return objData;
  }
}

for (let [k, v] of Object.entries(API_URL)) {
  API_URL[k] = domain + v
}

// 全局配置
const config = {
  // 日志级别 DEBUG/INFO/WARN/ERROR
  LogLevel: 'DEBUG'
}

module.exports = {
  API_URL: API_URL,
  config: config,
  domain,
  //合规状态常量
  hgStatus: {
    NO_ALL: -3, //未登记 未测评
    NO_REGISTRATED: -2,//未登记  已测评
    NO_ANSWER: -1, //已登记 未测评
    NO_SHOW: 0,//直接使用
    IS_RETSET: 1,//重测
    SHOW_CONFIRM: 2//弹确认书
  },
  //订阅主题常量
  subjects: {
    //风险测评
    fxcp: 'fxcp',
    //用户登记
    userCheckIn: 'checkIn',
    //同意使用确认书
    agreePayRule: 'agreePayRule',
    //登录成功
    loginSuccess: 'loginSuccess',
  },
  // 按钮提交表单接口
  formIdUrl:'https://yctg.gp58.com/formId/save',
  // 获取Token
  tokenUrl:'https://yctg.gp58.com/returnData/upload',
  
}
