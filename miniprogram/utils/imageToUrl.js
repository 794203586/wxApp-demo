// https://7a79-zyp-wx-yun-on-line-xwpnj-1302700933.tcb.qcloud.la/my-image.jpg
// https://7a79-zyp-wx-yun-on-line-xwpnj-1302700933.tcb.qcloud.la/my-image.png

// "cloud://zyp-wx-yun-on-line-xwpnj.7a79-zyp-wx-yun-on-line-xwpnj-1302700933/my-image.png"
const app = getApp();

function fileToUrl(fileId)
{
    const env = app.globalData.env; // zyp-wx-yun-on-line-xwpnj

    fileId = fileId.replace("cloud://", "https://");
    // "https://zyp-wx-yun-on-line-xwpnj.7a79-zyp-wx-yun-on-line-xwpnj-1302700933/my-image.png"
    fileId = fileId.replace(env + ".", "");
    // "https://7a79-zyp-wx-yun-on-line-xwpnj-1302700933/my-image.png"
    const lastIndex = fileId.lastIndexOf("/");
    const beginStr = fileId.substring(0,lastIndex);
    const endStr = fileId.substring(lastIndex);

    return `${beginStr}.tcb.qcloud.la${endStr}`;
}

module.exports = {
    fileToUrl
};