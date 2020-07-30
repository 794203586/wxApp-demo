// 转换时间
const getDate = (year, month, day, hour, minute) => {
    const newyear = year.substr(0, year.length - 1);
    const setmonth = month.substr(0, month.length - 1);
    const newmonth = setmonth < 10 ? '0' + setmonth : setmonth;
    const setday = day.substr(0, day.length - 1);
    const newday = setday < 10 ? '0' + setday : setday;
  
    // const sethour = hour.substr(0, hour.length - 1);
    const newhour = hour < 10 ? '0' + hour : hour;
    // const setminute = minute.substr(0, minute.length - 1);
  
    const newminute = minute < 10 ? '0' + minute : minute;
  
    return newyear + '-' + newmonth + '-' + newday + ' ' + newhour + ":" + newminute;
}
const getCurrentDate = (isDate) =>{
    var timestamp = Date.parse(new Date());  
    var n = timestamp;  
    var date = new Date(n);  
    //年  
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    if(isDate)
    {
        return `${Y}-${M}-${D}`;
    }
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    //秒  
    var s = date.getSeconds();  
    s = s < 10 && "0"+ s || s;
    
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}
// 将时间戳转换为时间
const getobjDate = (date)=> {
    let now;
    if (date){
        now = new Date(date)
    }else{
        now = new Date()
    }
        let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate(),
        h = now.getHours(), //获取当前小时数(0-23)
        f = now.getMinutes(),

        n = (Math.ceil((now.getMinutes()) / 10))*10; //获取当前分钟数(0-59)  取整数
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (f < 10 ? "0" + f : f);

}

//根据年月  获取天数
const mGetDate = (year, month) => {
    var d = new Date(year, month, 0);
    return d.getDate();
}

module.exports = {
    getDate,
    getobjDate,
    mGetDate,
    getCurrentDate
};