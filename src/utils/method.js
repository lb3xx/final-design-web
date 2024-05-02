export let getTimeStamp = function (oDate) {
    if(oDate.toString().length>19){
    let year = oDate.getFullYear()
    let month = oDate.getMonth() + 1
    let day = oDate.getDate()
    let hour = oDate.getHours()
    let minu = oDate.getMinutes()
    let sec = oDate.getSeconds()
    month = month < 10 ? '0' + month : '' + month
    day = day < 10 ? '0' + day : '' + day
    hour = hour < 10 ? '0' + hour : '' + hour
    minu = minu < 10 ? '0' + minu : '' + minu
    sec = sec < 10 ? '0' + sec : '' + sec

    let sDate = `${year}-${month}-${day} ${hour}:${minu}:${sec}`
    console.log(oDate,sDate)
    // YYYY-MM-DD HH:mm:ss
    return sDate
    }
    return oDate;
}