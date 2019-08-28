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
		InitComprise("XTWH/javascript/PJDXLXWH.js");
		InitCompriseCss("source/css/XTWH/PJDXLXWH.css");
		var bwidth = $(this).width();
		var bheight = $(this).height();
	</script>
  </head>
  
  <body onload="dxlxwh.initLoad();">
  	<div class="con">
  		<div class="TopGrid">
  			<div class="GridDiv" id="GridDiv"></div>
  		</div>
  		<div class="SetCenter">
  			<div class="formDiv">
  				<div class="formLeft">编码：</div>
  				<div class="formRight"><input type="text" id="VNum" disabled/></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">名称：</div>
  				<div class="formRight"><input type="text" id="VName" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">主管单位：</div>
  				<div class="formRight">
  					<select id="VGoverningBody" >
  						<option value="1">医院</option>
  						<option value="2">机构</option>
  					</select>
  				</div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">EP名称：</div>
  				<div class="formRight"><input type="text" id="VEpName" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">初始化SQL：</div>
  				<div class="formRight"><textarea id="VSQL" ></textarea></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">部门选择EP：</div>
  				<div class="formRight"><input type="text" id="VClassEpNum" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">部门选择SQL：</div>
  				<div class="formRight"><textarea id="VClassSQL" ></textarea></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">多维数据集：</div>
  				<div class="formRight"><input type="text" id="VCubeNum" /></div>
  			</div>
  			<div class="formDiv">
  				<div class="formLeft">数据集维度：</div>
  				<div class="formRight"><input type="text" id="VDIM" /></div>
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
  				<div class="formLeft">默认加载：</div>
  				<div class="formRight" id="BDefaultLoad">
  					<div class="bitradio">
	  					<input id="BDefaultLoad1" name="BDefaultLoad" type="radio" value="1"  checked="checked"/>
	  					<label for="BDefaultLoad1" class="radio-label">是</label>
  					</div>
  					<div class="bitradio">
	  					<input id="BDefaultLoad0" name="BDefaultLoad" type="radio" value="0" />
	  					<label for="BDefaultLoad0" class="radio-label">否</label>
  					</div>
  				</div>
  			</div>
  			<div class="BtnFoot">
	  			<div class="BomToolbar">
	  				<div class="Tbar">
	  					<input type="button" id="can" class="Btn" value="放弃" onclick="dxlxwh.BtnCan()" onmouseover="dxlxwh.BtnMove(1,this);" onmouseout="dxlxwh.BtnMove(2,this);"/>
	  				</div>
	  				<div class="Tbar">
	  					<input type="button" id="sav" class="Btn" value="保存" onclick="dxlxwh.BtnSav()" onmouseover="dxlxwh.BtnMove(1,this);" onmouseout="dxlxwh.BtnMove(2,this);"/>
	  				</div>
	  				<div class="Tbar">
	  					<input type="button" id="mod" class="Btn" value="修改" onclick="dxlxwh.BtnMod()" onmouseover="dxlxwh.BtnMove(1,this);" onmouseout="dxlxwh.BtnMove(2,this);"/>
	  				</div>
	  				<div class="Tbar">
	  					<input type="button" id="add" class="Btn" value="新增" onclick="dxlxwh.BtnAdd()" onmouseover="dxlxwh.BtnMove(1,this);" onmouseout="dxlxwh.BtnMove(2,this);"/>
	  				</div>
	  			</div>
	  		</div>
  		</div>
  	</div>
  </body>
</html>
