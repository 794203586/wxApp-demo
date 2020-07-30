const app = getApp();

//Page Object
Page({
    data: {
        isLogin: false,
        loginText: "登录",
        showModal: false
    },
    login: function(){
        if(!this.data.isLogin)
        {
            this.setData({
                showModal: true
            });
        }
    },
    getCity: function(){
        wx.showToast({
          title: app.globalData.userInfo.city
        });
    },
    loginSuccess: function(){
        this.onShow();
    },
    initData: function(){
        let paramData = {
            loginText: "登录",
            showModal: false
        };
        if(app.globalData.userInfo)
        {
            paramData.isLogin = true;
            paramData.loginText = "已登录";
        }
        this.setData(paramData);
    },
    //options(Object)
    onLoad: function(options){
        
    },
    onShow: function(){
        this.initData();
    }
});