<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>病种系数维护</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitCompriseCss("source/css/FormCss.css");
		InitComprise(BassModuleUrl+"Grid/LyGrid.js");
		InitComprise("XTWH/javascript/BZXSWH.js");
		InitCompriseCss("source/css/XTWH/BZXSWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="bzwh.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="bzwh.FilCheClick();"/>
  					<label for="valueqry" class="checkbox-label">模糊查询</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="bzwh.FilCheClick();"/>
  					<label for="bitqry" class="checkbox-label">是否可用</label>
  				</div>
  				<div class="filradio">
					<input id="FilBit1" name="FilBit" type="radio" value="1" checked="checked" />
					<label for="FilBit1" class="radio-label">是</label>
				</div>
				<div class="filradio">
					<input id="FilBit0" name="FilBit" type="radio" value="0" />
					<label for="FilBit0" class="radio-label">否</label>
				</div>
				<div class="QryBtn">
					<input type="button" id="Qry" class="Btn" value="查询" onclick="" onmouseover="bzwh.BtnMove(1,this);" onmouseout="bzwh.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter">
  			<div class="formDiv">
  				<div class="formLeft">病种编码：</div>
  				<div class="formRight"><input type="text" id="VBZBM" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">病种名称：</div>
  				<div class="formRight"><input type="text" id="VBZMC" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">拼音码：</div>
  				<div class="formRight"><input type="text" id="VPYM" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">系数：</div>
  				<div class="formRight"><input type="text" id="NXS" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">是否可用：</div>
  				<div class="formRight">
  					<div class="bitradio">
	  					<input id="BENABLE1" name="BENABLE" type="radio" value="1" checked="checked" />
	  					<label for="BENABLE1" class="radio-label">是</label>
  					</div>
  					<div class="bitradio">
	  					<input id="BENABLE0" name="BENABLE" type="radio" value="0" />
	  					<label for="BENABLE0" class="radio-label">否</label>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="" onmouseover="bzwh.BtnMove(1,this);" onmouseout="bzwh.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="保存" onclick="" onmouseover="bzwh.BtnMove(1,this);" onmouseout="bzwh.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="mod" class="Btn" value="修改" onclick="" onmouseover="bzwh.BtnMove(1,this);" onmouseout="bzwh.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="add" class="Btn" value="新增" onclick="" onmouseover="bzwh.BtnMove(1,this);" onmouseout="bzwh.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
