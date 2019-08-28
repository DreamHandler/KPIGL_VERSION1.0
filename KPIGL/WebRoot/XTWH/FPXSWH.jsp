<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>分配系数维护</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitCompriseCss("source/css/FormCss.css");
		InitComprise(BassModuleUrl+"Grid/LyGrid.js");
		InitComprise("XTWH/javascript/FPXSWH.js");
		InitCompriseCss("source/css/XTWH/FPXSWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="fpxs.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="fpxs.FilCheClick(this,1,'FilValue');"/>
  					<label for="valueqry" class="checkbox-label">模糊查询&nbsp;</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="fpxs.FilCheClick(this,2,'FilBit');"/>
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
					<input type="button" id="Qry" class="Btn" value="查询" onclick="fpxs.LoadData();" onmouseover="fpxs.BtnMove(1,this);" onmouseout="fpxs.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter">
  			<div class="formDiv">
  				<div class="formLeft">科室编码：</div>
  				<div class="formRight">
  					<input type="text" id="VNum" />
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">科室名称：</div>
  				<div class="formRight">
  					<input type="text" id="VName" />
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">归属科室名称：</div>
  				<div class="formRight">
  					<input type="text" id="VManagement" />
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">分配系数：</div>
  				<div class="formRight">
  					<input type="text" id="NDistribution" />
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">是否可用：</div>
  				<div class="formRight" id="Benable">
  					<div class="bitradio">
	  					<input id="Benable1" name="Benable" type="radio" value="1" checked="checked" />
	  					<label for="Benable1" class="radio-label">是</label>
  					</div>
  					<div class="bitradio">
	  					<input id="Benable0" name="Benable" type="radio" value="0" />
	  					<label for="Benable0" class="radio-label">否</label>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="fpxs.BtnCan()" onmouseover="fpxs.BtnMove(1,this);" onmouseout="fpxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="保存" onclick="fpxs.BtnSav()" onmouseover="fpxs.BtnMove(1,this);" onmouseout="fpxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="mod" class="Btn" value="修改" onclick="fpxs.BtnMod()" onmouseover="fpxs.BtnMove(1,this);" onmouseout="fpxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="add" class="Btn" value="新增" onclick="fpxs.BtnAdd()" onmouseover="fpxs.BtnMove(1,this);" onmouseout="fpxs.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
