const app = getApp()

Page({
    data: {
    },
    onShow: function(){
      this.getUserInfo();
    },
    onGetOpenid: function() {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid;
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
                app.globalData.userInfo = res.userInfo;
                
                wx.switchTab({
                  url: '/pages/home/index'
                });
                // console.log("navigateTo--1");
              }
            })
            // 获取openId


          }
        },
      });
    }
})