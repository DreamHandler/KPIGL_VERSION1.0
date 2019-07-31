<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>登录</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitCompriseCss("source/css/Login.css");
		InitComprise("source/js/Login.js");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="login.initLoad();">
    <div class="con">
    	<div class="con1">
    		<div class="head">
    			<div class="logo"></div>
    		</div>
    		<div class="center">
    			<div class="showImg"></div>
    			<div class="FormDiv">
    				<div class="Form_LT"></div>
    				<div class="Form_T"></div>
    				<div class="Form_RT"></div>
    				<div class="Form_L"></div>
    				<div class="Form_C">
    					<div class="Form_head">用户登录</div>
    					<form name="form1" method="post" action="http.do">
    					<div class="Form_user">
    						<div class="user_img"><img src="source/images/user_img.png" width="20" height="40" style="float:left;margin-left:15px;margin-top:5px;" /></div>
    						<div class="user_inp"><input type="text" id="username" name="username" style="width:254px;height:48px;border:0px;font-size:30px;"/></div>
    					</div>
    					<div class="Form_pwd">
    						<div class="pwd_img"><img src="source/images/pwd_img.png" width="30" height="38" style="float:left;margin-left:10px;margin-top:6px;" /></div>
    						<div class="pwd_inp"><input type="password" id="password" name="password" style="width:254px;height:48px;border:0px;font-size:30px;"/></div>
    					</div>
    					<div class="Form_word">
    						<div class="word_left">
    							<div class="word_img"><img src="source/images/word_img.png" width="38" height="38" style="float:left;margin-left:6px;margin-top:6px;" /></div>
    							<div class="word_inp"><input type="text" id="yzm" name="yzm" style="width:104px;height:48px;border:0px;font-size:30px;"/></div>
    						</div>
    						<div class="word_right">
    							<img id="RANDIMG" src="Login/RandNum.jsp" onclick="login.changeNum();" style="cursor:pointer;vertical-align:middle;" width="130px" height="50px" />
    						</div>
    					</div>
    					<div class="Form_btn">
    						<input type="submit" class="Btn" value="登&nbsp;&nbsp;录"/>
    					</div>
    					</form>
    				</div>
    				<div class="Form_R"></div>
    				<div class="Form_LB"></div>
    				<div class="Form_B"></div>
    				<div class="Form_RB"></div>
    			</div>
    		</div>
    		<div class="foot"></div>
    	</div>
    </div>
    <script type="text/javascript">
    	$("#username").focus();
    </script>
  </body>
</html>