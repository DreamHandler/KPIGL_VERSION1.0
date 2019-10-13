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
		InitComprise(BassModuleUrl+"Grid/LyDialog.js");
		InitComprise(BassDirUrl+"LyFuntion.js");
		InitComprise("XTWH/javascript/BZXSWH.js");
		InitCompriseCss("source/css/XTWH/BZXSWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="bzxs.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="bzxs.FilCheClick(this,1,'FilValue');"/>
  					<label for="valueqry" class="checkbox-label">分组查询&nbsp;</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="bzxs.FilCheClick(this,2,'FilBit');"/>
  					<label for="bitqry" class="checkbox-label">分组是否可用</label>
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
					<input type="button" id="Qry" class="Btn" value="查询" onclick="bzxs.LoadData();" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter" id="bz_info" style="display:none;">
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
  		<div class="SetCenter" id="fz_info">
  			<div class="formDiv" >
  				<div class="formLeft">分组编码：</div>
  				<div class="formRight">
  					<input type="text" id="VNum_fz" disabled/>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">分组名称：</div>
  				<div class="formRight">
  					<input type="text" id="VName_fz" disabled/>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">通用系数：</div>
  				<div class="formRight"><input type="text" id="NGeneral_fz"/></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">是否可用：</div>
  				<div class="formRight" id="Benable_fz">
  					<div class="bitradio">
	  					<input id="Benable_fz1" name="Benable_fz" type="radio" value="1" checked="checked" />
	  					<label for="Benable_fz1" class="radio-label">是</label>
  					</div>
  					<div class="bitradio">
	  					<input id="Benable_fz0" name="Benable_fz" type="radio" value="0" />
	  					<label for="Benable_fz0" class="radio-label">否</label>
  					</div>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">是否使用通用系数：</div>
  				<div class="formRight" id="BUseGeneral_fz">
  					<div class="bitradio">
	  					<input id="BUseGeneral_fz1" name="BUseGeneral_fz" type="radio" value="1" checked="checked" />
	  					<label for="BUseGeneral_fz1" class="radio-label">是</label>
  					</div>
  					<div class="bitradio">
	  					<input id="BUseGeneral_fz0" name="BUseGeneral_fz" type="radio" value="0" />
	  					<label for="BUseGeneral_fz0" class="radio-label">否</label>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<!-- <div class="Tbar">
  					<input type="button" id="import" class="Btn" value="导入病种" onclick="bzxs.import()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div> -->
  				<div class="Tbar">
  					<input type="button" id="add" class="Btn" value="新增分组" onclick="bzxs.BtnAdd()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="addBZ" class="Btn" value="添加病种" onclick="bzxs.addBZ()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="mod" class="Btn" value="修改" onclick="bzxs.BtnMod()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="保存" onclick="bzxs.BtnSav()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="bzxs.BtnCan()" onmouseover="bzxs.BtnMove(1,this);" onmouseout="bzxs.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
