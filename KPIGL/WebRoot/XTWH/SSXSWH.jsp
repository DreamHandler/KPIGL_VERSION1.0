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
		InitComprise(BassDirUrl+"LyFuntion.js");
		InitComprise("XTWH/javascript/SSXSWH.js");
		InitCompriseCss("source/css/XTWH/SSXSWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="ssxs.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="ssxs.FilCheClick(this,1,'FilValue');"/>
  					<label for="valueqry" class="checkbox-label">模糊查询&nbsp;</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="ssxs.FilCheClick(this,2,'FilBit');"/>
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
					<input type="button" id="Qry" class="Btn" value="查询" onclick="ssxs.LoadData();" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter">
  			<div class="formDiv">
  				<div class="formLeft">病种编码：</div>
  				<div class="formRight">
  					<input type="text" id="VNum" disabled/>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">病种名称：</div>
  				<div class="formRight">
  					<input type="text" id="VName" disabled/>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">分配系数：</div>
  				<div class="formRight"><input type="text" id="NDistribution"/></div>
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
  			<div class="formDiv">
  				<div class="formLeft">备注：</div>
  				<div class="formRight"><textarea id="VRemarks" ></textarea></div>
  			</div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<div class="Tbar">
  					<input type="button" id="import" class="Btn" value="导入更新" onclick="ssxs.import()" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
  				</div>
  				<!-- <div class="Tbar">
  					<input type="button" id="add" class="Btn" value="新增" onclick="ssxs.BtnAdd()" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
  				</div> -->
  				<div class="Tbar">
  					<input type="button" id="mod" class="Btn" value="修改" onclick="ssxs.BtnMod()" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="保存" onclick="ssxs.BtnSav()" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="ssxs.BtnCan()" onmouseover="ssxs.BtnMove(1,this);" onmouseout="ssxs.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
