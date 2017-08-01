String.prototype.toJSON = function(){
	return eval("("+this+")");
};
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var _util = function(){ //  http://202.96.245.236:8080  http://192.168.3.107:8080
	var _self = this;
	var root_url = "http://202.96.245.236:8080/";
	_self.rootUrl = function (){
		return root_url;
	};
	_self.fetch = function(Storage_key){
		return (window.localStorage.getItem(Storage_key) || "{}").toJSON();
	};
	_self.save = function(Storage_key, item){
		window.localStorage.setItem(Storage_key, JSON.stringify(item));
	};
	_self.reqUrl = function(){
		return root_url + "scmmk/rest/mobile/";
	};
	_self._ajax = function(param){
		var _this = this;
		var curParam = {
				type: "post",
				dataType: "json",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8"
			};
		param.url = _this.reqUrl() + param.url;
		_this._assign(curParam, param);
		$.ajax(curParam);
	};
	_self._ajaxJSON = function(param){
		param.data = JSON.stringify(param.data);
		param.contentType = "application/json;charset=UTF-8";
		param.global = false;
		this._ajax(param);
	};
	_self._ajaxFiles = function(param){
		param.processData = false;
		param.contentType = false;
		param.async = false;
		this._ajax(param);
	};
	_self._assign = function(arg0, arg1){
		for(var o in arg1){
			arg0[o] = arg1[o];
		}
		return arg0;
	};
	_self._param = function (array){
		var param = "";
		for(var i in array){
			if($.isEmptyObject(array[i])) continue;
			if(array[i] instanceof Array){
				for(var j in array[i]){
					if($.isEmptyObject(array[i][j])) continue;
					param += "&" + $.param(array[i][j]);
				}
			}else{
				param += "&" + $.param(array[i]);
			}
		}
		return param.substring(1);
	};
	return _self;
};


