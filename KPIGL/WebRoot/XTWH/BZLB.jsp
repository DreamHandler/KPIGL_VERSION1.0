<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>病种列表</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitCompriseCss("source/css/FormCss.css");
		InitComprise(BassModuleUrl+"Grid/LyGrid.js");
		InitComprise(BassDirUrl+"LyFuntion.js");
		InitComprise("XTWH/javascript/BZLB.js");
		InitCompriseCss("source/css/XTWH/BZLB.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
		var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)
		dialog.set("title", "病种信息列表"); //设置标题
		
		var VGroupNum = dialog.get("VGroupNum");
		var NGeneral = dialog.get("NGeneral");
		
		//var VGroupNum = "1";
		//var NGeneral = "222";
	</script>
  </head>
  
  <body onload="bzlb.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="bzlb.FilCheClick(this,1,'FilValue');"/>
  					<label for="valueqry" class="checkbox-label">病种查询&nbsp;</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="bzlb.FilCheClick(this,2,'FilBit');"/>
  					<label for="bitqry" class="checkbox-label">是否可用</label>
  				</div>
  				<div id="FilBit">
  					<div class="filradio">
						<input id="FilBit1" name="FilBit" type="radio" value="1" checked="checked" />
						<label for="FilBit1" class="radio-label">是</label>
					</div>
					<div class="filradio">
						<input id="FilBit0" name="FilBit" type="radio" value="0" />
						<label for="FilBit0" class="radio-label">否</label>
					</div>
  				</div>
  				
				<div class="QryBtn">
					<input type="button" id="Qry" class="Btn" value="查询" onclick="bzlb.LoadData();" onmouseover="bzlb.BtnMove(1,this);" onmouseout="bzlb.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="确定" onclick="bzlb.BtnSav()" onmouseover="bzlb.BtnMove(1,this);" onmouseout="bzlb.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="bzlb.BtnCan()" onmouseover="bzlb.BtnMove(1,this);" onmouseout="bzlb.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
