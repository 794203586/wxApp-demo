
const db = wx.cloud.database();
const tableName = "activity";

function addActivity(data){
    return new Promise((resolve, reject) => {
        db.collection(tableName).add({
            data: {
                ...data
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                // this.setData({
                //     counterId: res._id,
                //     count: 1
                // });
                resolve(res._id);
                
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                reject(err);
                console.error('[数据库] [新增记录] 失败：', err)
            }
        });
    });
}
/* 获得最新列表 */
function getActivitys(model)
{
    return new Promise((resolve, reject) =>{
        const db = wx.cloud.database();
        const _ = db.command;

        let skip = (model.pageIndex - 1) * model.pageSize;
        let pageSize = model.pageSize;
        
        db.collection(tableName).where(model.data)
        .skip(skip)
        .limit(pageSize)
        .orderBy("startDate", "desc").get({
            success: res =>{
                resolve(res.data);
            },
            fail: err =>{
                reject(err);
            }
        })
    });
}
function getMyActivitys(model)
{
    return new Promise((resolve, reject) =>{
        const db = wx.cloud.database();
        const _ = db.command;
        let skip = (model.pageIndex - 1) * model.pageSize;
        let pageSize = model.pageSize;

        db.collection(tableName).where({
            "users.openId": _.eq(model.openid)
        })
        .skip(skip)
        .limit(pageSize)
        .orderBy("startDate", "desc").get({
            success: res =>{
                resolve(res.data);
            },
            fail: err =>{
                reject(err);
            }
        })
    });
}
function getActivity(id)
{
    return new Promise((resolve, reject) =>{
        const db = wx.cloud.database();
        db.collection(tableName).doc(id).get({
            success: res => {
                resolve(res.data);
            },
            fail: err =>{
                reject(err);
            }
        })
    });
}
function signUp(id, userInfo)
{
    return new Promise((resolve, reject) =>{
        const db = wx.cloud.database();
        const _ = db.command;
        let userModel = {
            openId: userInfo.openId, 
            nickName: userInfo.nickName, 
            avatarUrl: userInfo.avatarUrl
        };
        db.collection(tableName).doc(id).update({
            data: {
                users: _.push(userModel)
            },
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err);
            }
        });

    });
}
function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == "x" ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
module.exports = { addActivity, getActivity, getActivitys, getMyActivitys, signUp, guid };