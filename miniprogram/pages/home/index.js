const app = getApp();
import { getActivitys } from "../../service/activityService.js";
import { fileToUrl } from "../../utils/imageToUrl.js";

Page({
    data: {
      activitys: [],
      scrollHeight: 0,  
      scrollTop: 0,
      pageIndex: 1,
      pageSize: 2,
      isNoData: false
    },
    initList: function(openid){
      
        // 判断是否登录了
        if(!app.globalData.userInfo)
        {
            wx.showToast({
                icon: "none",
                title: "请先登录！"
            });
            return false;
        }

      if(this.data.isNoData)
      {
        wx.showToast({
          title: "没有更多数据了",
        });
        return false;
      }

      let param = {
        pageIndex: this.data.pageIndex, 
        pageSize: this.data.pageSize,
        data: {}
      };
      const user = app.globalData.userInfo;
      if(user)
      {
        param.data.city = user.city;
      }
      getActivitys(param).then(res =>{
        let lists = this.data.activitys;
        for(let m of res)
        {
          
          m.imageJson.imagePath = fileToUrl(m.imageJson.fileID);
          lists.push(m);
        }
        let dataParam = {
          activitys: lists
        };
        if(!res || !res.length || res.length < this.data.pageSize)
        {
          dataParam.isNoData = true;
        }
        
        this.setData(dataParam);

      });
    },
    initData: function(){
      this.setData({
        activitys: [],
        scrollHeight: 0,  
        scrollTop: 0,
        pageIndex: 1,
        pageSize: 2,
        isNoData: false
      });
      
      wx.getSystemInfo
      ({
        success: res =>
        {
          this.setData
          ({
            scrollHeight: res.windowHeight
          });
        }
      });
    },
    onShow: function(){
      this.initData();
      this.initList();
    },
    onLoad: function(){
      // 判断是否授权，没有授权，跳转到授权页面
      // if(!app.globalData.userInfo)
      // {
      //   wx.navigateTo({
      //       url: '/pages/authorize/index',
      //   });
      // }
      
    },
    upper: function(e){
      // this.initList();
    },
    lower: function(e){
      
      if(!this.data.isNoData)
      {
        this.setData({
          pageIndex: ++this.data.pageIndex
        });
      }
      this.initList();
    },
    toDetail: function(e)
    {
      let id = e.currentTarget.dataset.id;
      
      // 跳转到详情
      wx.navigateTo({
        url: "./detail/index?id=" + id
      });
    }
});