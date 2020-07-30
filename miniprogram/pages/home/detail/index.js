const app = getApp();
import { getActivity, signUp } from "../../../service/activityService.js";
import { fileToUrl } from "../../../utils/imageToUrl.js";

const globalData = app.globalData;

Page({
    data: {
        id: undefined,
        model: undefined,
        showModal: false,
        isDisabled: false,
        isExpire: false     // 是否到期
    },
    //options(Object)
    onLoad: function(options){
        if(options && options.id)
        {
            this.setData({
                id: options.id
            });

            this.loadDetailInfo();
        }
    },
    loadDetailInfo: function(){
        getActivity(this.data.id).then(res =>{
            
            let data = {
                model: res
            };
            if(data.model.imageJson)
            {
                data.model.imageJson.imagePath = fileToUrl(data.model.imageJson.fileID);
            }
            let users = res.users;
            let findUser = users.find(p => p.openId == globalData.openid);
            if(findUser)
            {
                data.isDisabled = true;
            }
            var diff = new Date(res.startDate) - new Date();
            if(diff > 0 )
            {
                data.isExpire = true;
            }
            this.setData(data);
            
        });
    },
    // 我要报名活动
    signUp: function(){
        // 判断是否登录了
        if(!app.globalData.userInfo)
        {
            wx.showToast({
                icon: "none",
                title: "请先登录！"
            });
            return false;
        }

        // 活动过期了
        if(this.data.isExpire)
        {
            wx.showToast({
                icon: 'none',
                title: "已经过期了，无法参加啦~！"
            });
            return ;
        }
        const currentUser = globalData.userInfo;
        let userInfo = {
            openId: globalData.openid, 
            nickName: currentUser.nickName, 
            avatarUrl: currentUser.avatarUrl
        };
        signUp(this.data.id, userInfo).then(res =>{
            wx.showToast({
                title: "报名成功~！",
            });

            wx.navigateBack({
              delta: 0,
            });
        });
    }
});