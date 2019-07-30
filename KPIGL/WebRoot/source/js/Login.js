var LOGIN = Class.create();
LOGIN.prototype = Object.extend(new LBase(),{
	initLoad : function(){
		login.initCss();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		$(".con1").width(bwidth);
		$(".con1").height(bheight);
		$(".head").width(bwidth);
		$(".center").width(bwidth);
		$(".center").height(bheight-250);
		$(".showImg").css("margin-left",(bwidth-618-30-380)/2+"px");
		$(".showImg").css("margin-top",(bheight-250-450)/2+"px");
		$(".FormDiv").css("margin-top",(bheight-250-450)/2+"px");
		$(".foot").width(bwidth);
		$("#u").focus();
	},
	changeNum : function(){
		document.getElementById("RANDIMG").src="Login/RandNum.jsp?"+Math.random();
	}
});
var login = new LOGIN();