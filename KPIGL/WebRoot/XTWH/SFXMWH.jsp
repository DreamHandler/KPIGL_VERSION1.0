<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>收费项目维护</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitCompriseCss("source/css/FormCss.css");
		InitComprise(BassModuleUrl+"Grid/LyGrid.js");
		InitComprise(BassDirUrl+"LyFuntion.js");
		InitComprise("XTWH/javascript/SFXMWH.js");
		InitCompriseCss("source/css/XTWH/SFXMWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="sfxm.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="fillter">
  				<div class="checkdiv">
  					<input id="valueqry" name="valueqry" type="checkbox" onclick="sfxm.FilCheClick(this,1,'FilValue');"/>
  					<label for="valueqry" class="checkbox-label">模糊查询&nbsp;</label>
  				</div>
  				<div class="textdiv"><input type="text" id="FilValue" /></div>
  				<div class="checkdiv">
  					<input id="bitqry" name="bitqry" type="checkbox" onclick="sfxm.FilCheClick(this,2,'FilBit');"/>
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
					<input type="button" id="Qry" class="Btn" value="查询" onclick="sfxm.LoadData();" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
				</div>
  			</div>
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter">
  			<div class="formDiv">
  				<div class="formLeft">项目类型：</div>
  				<div class="formRight" id="IItemType">
  					<div class="bitradio">
	  					<input id="IItemType1" name="IItemType" type="radio" value="1" checked="checked" />
	  					<label for="IItemType1" class="radio-label">标准项目</label>
  					</div>
  					<div class="bitradio">
	  					<input id="IItemType2" name="IItemType" type="radio" value="2" />
	  					<label for="IItemType2" class="radio-label">自定义</label>
  					</div>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">项目种类：</div>
  				<div class="formRight" id="IProjectType">
  					<div class="bitradio">
	  					<input id="IProjectType0" name="IProjectType" type="radio" value="0" checked="checked" />
	  					<label for="IProjectType0" class="radio-label">不区分</label>
  					</div>
  					<div class="bitradio">
	  					<input id="IProjectType1" name="IProjectType" type="radio" value="1" checked="checked" />
	  					<label for="IProjectType1" class="radio-label">非手术类</label>
  					</div>
  					<div class="bitradio">
	  					<input id="IProjectType2" name="IProjectType" type="radio" value="2" />
	  					<label for="IProjectType2" class="radio-label">手术类</label>
  					</div>
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
  			<div class="formDiv">
  				<div class="formLeft">项目名称：</div>
  				<div class="formRight">
  					<input type="text" id="VNum" style="display:none;"/>
  					<input type="text" id="VName" disabled/>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">门诊医生点数：</div>
  				<div class="formRight"><input type="text" id="NOutDoc" ToFix="0.00"/></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">临床医生点数：</div>
  				<div class="formRight"><input type="text" id="NClinician" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">麻醉师点数：</div>
  				<div class="formRight"><input type="text" id="NAnesthetist" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">检验科室点数：</div>
  				<div class="formRight"><input type="text" id="NInspection" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">病区护士点数：</div>
  				<div class="formRight"><input type="text" id="NWardNurses" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">病区手术室护士点数：</div>
  				<div class="formRight"><input type="text" id="NWardRoomNurse" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">门诊手术室护士点数：</div>
  				<div class="formRight"><input type="text" id="NOutRoomNurse" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">准分子护士点数：</div>
  				<div class="formRight"><input type="text" id="NExcimerNurse" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">美容中心护士点数：</div>
  				<div class="formRight"><input type="text" id="NBeautyCentre" /></div>
  			</div>
  		</div>
  		<div class="BtnFoot">
  			<div class="BomToolbar">
  				<div class="Tbar">
  					<input type="button" id="import" class="Btn" value="导入更新" onclick="sfxm.import()" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
  				</div>
  				<!-- <div class="Tbar">
  					<input type="button" id="add" class="Btn" value="新增" onclick="sfxm.BtnAdd()" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
  				</div> -->
  				<div class="Tbar">
  					<input type="button" id="mod" class="Btn" value="修改" onclick="sfxm.BtnMod()" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="sav" class="Btn" value="保存" onclick="sfxm.BtnSav()" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
  				</div>
  				<div class="Tbar">
  					<input type="button" id="can" class="Btn" value="放弃" onclick="sfxm.BtnCan()" onmouseover="sfxm.BtnMove(1,this);" onmouseout="sfxm.BtnMove(2,this);"/>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
</html>
