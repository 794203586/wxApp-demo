//app.js
import wxValidate from "./utils/wxValidate.js";
App({
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  onLaunch: function () {
    // let env = "zyp-wx-yun-hp9bc"; // 测试环境
    let env = "zyp-wx-yun-on-line-xwpnj"; // 正式环境
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: env,
        traceUser: true,
      })
    }
    this.getUserInfo();
    this.globalData = {
      env: env
    };
  },
  
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid;
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // });
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // });
      }
    })
  },
  getUserInfo: function(){
      this.onGetOpenid();

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo;
                // wx.switchTab({
                //   url: '/pages/home/index'
                // });
                // console.log("navigateTo--1");
              },
              fail: err => {
              }
            })
          }
        },
      });
  },
  // 每次打开，获取用户信息
  // onShow: function(){
  //   this.getUserInfo();
  // },
  watch: function(method){
    let obj = this.globalData;
    let field = "openid";

    Object.defineProperty(obj, field,{
      configurable: true,
      enumerable: true,
      set: function(value){
        this["_" + field] = value;
        method(value);
      },
      get: function(){
        return this["_" + field];
      }
    });

  }
})
