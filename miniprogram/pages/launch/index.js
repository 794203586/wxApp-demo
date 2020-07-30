const app = getApp()
import { addActivity, guid } from "../../service/activityService.js";
import { getCurrentDate } from "../../utils/timeProcessor.js";

Page({
    data: {
        title: "",
        content: "",
        imageJson: {},
        date: "",
        startDate: ""
    },
    bindInput: function(e){
      let dataset = e.currentTarget.dataset;
      let field = dataset.val;
      var data = {};
      data[field] = e.detail.value;
      this.setData(data);
    },
    initData: function(){
      this.setData({
        title: "",
        content: "",
        imageJson: {},
        date: getCurrentDate(true),
        startDate: getCurrentDate(true)
      });

    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      });
    },
    onShow: function(){
      // 判断是否授权，没有授权，跳转到授权页面
      // if(!app.globalData.userInfo)
      // {
      //   wx.navigateTo({
      //     url: '/pages/authorize/index',
      //   });
      // }
    },
    onLoad: function(){
      if (!wx.cloud) {
        wx.redirectTo({
          url: '../chooseLib/chooseLib',
        });
        return;
      }
      this.initData();
      this.initValidate();
    },
    initValidate: function(){
      this.wxValidate = app.wxValidate(
        {
          title: {
            required: true,
          }
        }, 
        {
          title: {
            required: '请填写活动标题',
          }
        }
      );
    },
    // 上传图片
    doUpload: function () {
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success:  (res) => {
  
          wx.showLoading({
            title: '上传中',
          })
          console.log("success-res--", res);
          const filePath = res.tempFilePaths[0];
          
          // 上传图片
          const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log("cloud.uploadFile-res--", res);
            //   app.globalData.fileID = res.fileID
            //   app.globalData.cloudPath = cloudPath
            //   app.globalData.imagePath = filePath
                let imageJson = {fileID: res.fileID, cloudPath,imagePath: filePath};
                this.setData({
                    imageJson: imageJson
                });
            },
            fail: e => {
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
  
        },
        fail: e => {
          console.error(e)
        }
      })
    },
    // 发起事件
    launchEvent: function(){
      // 判断是否授权，没有授权，跳转到授权页面
      if(!app.globalData.userInfo)
      {
        wx.showToast({
          icon: "none",
          title: "请先登录！"
        });
        return false;
      }
        const globalData = app.globalData;
        const currentUser = app.globalData.userInfo;
        let model = {
            id: guid(),
            title: this.data.title,
            content: this.data.content,
            imageJson: this.data.imageJson,
            avatarUrl: currentUser.avatarUrl,
            nickName: currentUser.nickName,
            city: currentUser.city,
            startDate: this.data.date,
            createTime: getCurrentDate(),
            users: [{openId: globalData.openid, nickName: currentUser.nickName, avatarUrl: currentUser.avatarUrl}]
        };
        
        if(!this.wxValidate.checkForm(model))
        {
          const error = this.wxValidate.errorList[0];
          // `${error.param} : ${error.msg} `
          wx.showToast({
            title: `${error.msg} `,
            duration: 2000
          })
          return false;
        }
        addActivity(model).then(p =>{
            wx.showToast({
              title: '新增记录成功',
            });
            this.initData(); // 清空表单
            wx.switchTab({
              url: '/pages/home/index'
            });
        });
    }

})