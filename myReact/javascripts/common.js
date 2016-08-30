Common = {};

/**
 * 本地存储数据
 * @param  {String} key  
 * @param  {Object} data 

 //not sure about data.
 */
Common.saveLocalData = function(key, data){
    var datas = JSON.stringify(data);
    window.localStorage.setItem(key, datas);
};

/**
 * 获取本地数据
 * @param  {String} key 
 * @return {Object}     
 */
Common.getLocalData = function(key){
    var datas = window.localStorage.getItem(key);
    if(!datas) return null;

    return JSON.parse(datas);
};
/**
 * 清除本地数据
 * @param  {String} key 
 **/
Common.removeLocalData = function(key){
	window.localStorage.removeItem(key);
};

/**
 * @func getData
 * @desc 异步获取数据
 * @param {string} url 异步请求的地址
 * @param {object} data 请求的参数
 * @param {string} type html/json
 * @param {function} callback 回调函数
 * @cons {string} method “post”
 * @returns {boolean}
 * @example
 * Common.getData("/test",“{}”,function(data){})
 */
Common.getData = function(url, data, type, callback) {
    var encodeUrl = encodeURI(url);
    $.ajax({
        type: "POST",
        data: data,
        url: encodeUrl,
        dataType: type,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        context: document.body,
        success: function(rep) {
            if (!rep) {
                return;
            }
          	callback(rep);
        }
    });
};

//verify 1.null, 2.containing blank+underscode(下划线), 3.same tags, 4.can't length==1 
/**
 * @func verifyForm
 * @desc 异步获取数据
 * @param  {array} data [tag1,tag2,tag3]
 * @return {object} res {result:true/false, info:err/data}
 * err —— “1”:null, "2".containing blank, "3".can't length==1 , "4".same tags
**/
Common.verifyForm = function(data){
    var arr = [];
	var res={
                result:false,
            };
    for (var key in data){
        tep = data[key];
        if(tep==="") {
            res.info = 1; return res;
        }//null
        // if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(tep)){
        //     res.info = 2; return res;
        // }
        if(tep.length==1){
            res.info = 3; return res;
        }
        if(arr.indexOf(tep)!=-1){
            res.info = 4; return res;
        }
        arr.push(tep);
    }
    res.result = true;
    return res;
};
Common.verifyEmail = function(str){
    var r = /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$/.test(str);
    return r;
}

