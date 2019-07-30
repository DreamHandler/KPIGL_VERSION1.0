/*
 * 魏霸王*/
//cookie的操作
var cookie = {
		addCookie : function(OName,OVal,OTime){//新增cookie
			var str = OName+"="+escape(OVal);
			if(OTime>0){
				var date = new Date();
				var ms = OTime*60*60*1000;
				date.setTime(date.getTime()+ms);
				str += "; exprires="+date.toUTCString();
			}
			document.cookie = str;
		},
		setCookie : function(Name,Val){//设置cookie
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime()+Days*86400000);
			document.cookie = Name+"="+escape(Val)+";expires="+exp.toUTCString();
		},
		getCookie : function(OName){//获取cookie
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return unescape(arr[2]);
			}else{
				return null;
			}
		},
		delCookie : function(OName){//删除cookie
			document.cookie = OName+"=;expires="+(new Date(0)).toUTCString();
		}
}
//浏览器操作
BrowserEven = {
		getBrowserInfo : function(){//获取浏览器版本
			var Sys = {};
			var ua = navigator.userAgent.toLowerCase();
			var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
			var m = ua.match(re);
			Sys.browser = m[1].replace(/version/, "'safari");
			Sys.ver = m[2];
			return Sys;
		}
}
var isIE = "ActiveXObject" in window || !!window.ActiveXObject;
var skins = cookie.getCookie("skins")==null?"":cookie.getCookie("skins");
document.write('<script language="javascript" src="/LyUI/Origin/common.js"></script>');
