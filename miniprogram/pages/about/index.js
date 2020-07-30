const app = getApp();
import { getMyActivitys } from "../../service/activityService.js";
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
    initData: function(){
      this.setData({
        activitys: [],
        scrollHeight: 0,  
        scrollTop: 0,
        pageIndex: 1,
        pageSize: 2,
        isNoData: false
      });
      
      // 设置下拉加载容器的高度
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
    initList: function(openid){
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
        openid: app.globalData.openid
      };
      if(!app.globalData.userInfo)
      {
        wx.showToast({
          icon: "none",
          title: "请先登录！"
        });
        return false;
      }
      getMyActivitys(param).then(res =>{

        let lists = this.data.activitys;
        for(let m of res)
        {
          m.imageJson.imagePath = fileToUrl(m.imageJson.fileID);
          lists.push(m);
        }
        this.setData({
          activitys: lists
        });
        if(!res || !res.length || res.length < this.data.pageSize)
        {
          this.setData({
            isNoData: true
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
      //     wx.navigateTo({
      //         url: '/pages/authorize/index',
      //     });
      // }

      // this.initList();
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
        url: "../home/detail/index?id=" + id
      });
    }
})