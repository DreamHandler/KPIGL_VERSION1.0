<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.model.Aperator"%>
<%@page import="com.MFuns.MFuns"%>
<%@page import="com.MFuns.MSingleFuns"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession  Session = request.getSession();
//获得操作员对象
Aperator apr = (Aperator)Session.getAttribute("opr");
%>
<!DOCTYPE HTML>
<html>
	<head>
		<title>测试UI框架3</title>
		<script type="text/javascript" src="../SysDefUtil/Origin.js"></script>
		
		<script type="text/javascript">
			InitCompriseCss(BassModuleUrlB+"css/bootstrap.css");
			InitCompriseCss(BassModuleUrlB+"font-awesome/4.5.0/css/font-awesome.css");
			InitCompriseCss(BassModuleUrlB+"css/fonts.googleapis.com.css");
			InitCompriseCss(BassModuleUrlB+"css/ace.css");
			InitCompriseCss(BassModuleUrlB+"css/ace-skins.css");
			InitCompriseCss(BassModuleUrlB+"css/ace-rtl.css");
			InitComprise(BassModuleUrlB+"js/ace-extra.js");
			InitComprise("../source/js/Main.js");
			
			function changeFrameHeight(obj){//自动调整iframe页面尺寸
				var ifm = document.getElementById(obj.id);
				var mainmenu = document.getElementById("mainmenu");
				var win = window.innerHeight;
				var navbar = $('#navbar')[0].scrollHeight;
				var footer = 40;
				try{
					var bHeight=win-navbar-footer - 10;
					ifm.height = bHeight;
					$(mainmenu).css('max-height',(bHeight-20)+'px')
				}catch(ex){}
			 }
			 window.onresize = function(){//页面收缩时调用
				changeFrameHeight(document.getElementById("iframe_menu02"));
				var iframe = document.getElementById("iframe_menu02");
				var height = $('#mainmenu').height();
				var maxhe = $('#mainmenu').css('max-height');
				if(height>=parseInt(maxhe)){
					if(!$._data(iframe,'events')||!$._data(iframe,'events')['load']){
						$(iframe).load(function(){
								$('#iframe_menu02').contents().scroll(function(){
									var top = $('#iframe_menu02').contents().scrollTop();
									$('#mainmenu').css({'top':' -'+top+'px'});
							})
						})
					}
					if(!$._data($('#iframe_menu02').contents()[0],'events')||!$._data($('#iframe_menu02').contents()[0],'events')['scroll']){
						$('#iframe_menu02').contents().scroll(function(){
								var top = $('#iframe_menu02').contents().scrollTop();
								$('#mainmenu').css({'top':' -'+top+'px'});
							})
					}
				}else{
					if($._data(iframe,'events')&&$._data(iframe,'events')['load']){
						$(iframe).unbind();
						$('#iframe_menu02').contents().unbind();
					}
				}
			 }  
		</script>
		 <style>
		 	.settings-item{
		 		padding-top:10px;
		 	}
		 	body{
		 		overflow: auto;
		 	}
		 	#mainmenu{
			 	overflow:visible;
			 	position: relative;
			 	z-index: 1;
		 	}
		 	#sidebar-shortcuts{
		 		z-index: 30;
		 		position: relative;
		 	}
		 	#navbar{
		 		z-index: 30;
		 		position: relative;
		 	}
		 	#first-menu ul{
		 		border-top-left-radius:8px;
		 		border-top-right-radius:8px;
		 	}
		 	#first-menu li{
		 		margin-right:5px;
		 	}
		 	#first-menu li a{
		 		border-top-left-radius:5px !important;
		 		border-top-right-radius:5px !important;
		 		cursor:pointer;
		 	}
		 	#li_role{
		 		border-bottom-left-radius:8px !important;
		 		border-bottom-right-radius:8px !important;
		 	}
		 </style>
</head>
<body class="no-skin" onload="main.InitLoad();">
	<!-- 页面头部  -->
	<div id="navbar" class="navbar navbar-default ace-save-state" style="height:95px;background:url('source/images/navbar.png') ">
		<div class="navbar-container ace-save-state" id="navbar-container" style="height:100%;">
			<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
				<span class="sr-only">Toggle sidebar</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
				
			<div class="navbar-header pull-left" style="padding-top:0px;padding-left:30px;">
				<a href="#" class="navbar-brand" style="padding:0px;">
					<strong>
						<i class="fa fa-leaf" style="font-size:75px;margin-top:10px;margin-right:10px;"></i>
						<img src='source/images/KPI_NAME.png' style='height:75px;margin-top:-40px;'></img> 
					</strong>
				</a>
			</div>
				
			<div class="navbar-header pull-right" style="height:100%;">
				<div style="height:47px">
					<div class="navbar-buttons navbar-header pull-right pull-top" role="navigation">
						<ul class="nav ace-nav">
							<li class="light-blue dropdown-modal">
								<a id="li_role" data-toggle="dropdown" href="#" class="dropdown-toggle">
									<img class="nav-user-photo" src="/LyUI/Origin/bootstrap/images/avatars/user.jpg" alt="Jason's Photo" />
									<span class="user-info">
										<%
											if(apr == null){
												return;
											}
										%>
										<small><%=apr.getVascname()%></small>
										<%=apr.getAperator("VNAME")%>
									</span>
									<i class="ace-icon fa fa-caret-down"></i>
								</a>
	
								<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
									<!-- <li>
										<a onclick='main.goLocation(this,1);' href="RZCX\log.jsp" patch="登录日志" data-toggle="modal">
											<i class="ace-icon fa fa-sticky-note"></i>
											登录日志
										</a>
									</li> -->
									<li>
										<a href="#set-modal" data-toggle="modal">
											<i class="ace-icon fa fa-cog"></i>
											设置
										</a>
									</li>
									<li class="divider">
									<li>
										<a href="#">
											<i class="ace-icon fa fa-power-off"></i>
											注销
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<!-- 横向一级菜单 -->
				<div id="first-menu" class="navbar-buttons navbar-header pull-right pull-bottom" style="margin-top:5px;">
				</div>
			</div>
		</div><!-- /.navbar-container -->
	</div><!-- /.navbar -->
	<!-- 设置页面开始 -->
	<div id='set-modal' class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="smaller lighter blue no-margin">设置页面样式</h3>
				</div>
				<div class="row modal-body" style='margin-left: 0px;margin-right: 0px;'>
					<div class="pull-left width-50">
						   <div class="settings-item">
							   <div class="pull-left">
									<select id="skin-colorpicker" class="hide">
										<option data-skin="no-skin" value="#438EB9">#438EB9</option>
										<option data-skin="skin-1" value="#222A2D">#222A2D</option>
										<option data-skin="skin-2" value="#C6487E">#C6487E</option>
										<option data-skin="skin-3" value="#D0D0D0" selected>#D0D0D0</option>
									</select>
								</div>
								<span>&nbsp; 选择皮肤</span>
							</div>
							<div class="settings-item">
								<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" autocomplete="off" />
								<label class="lbl" for="ace-settings-rtl">  右变左(逻辑展示)</label>
							</div>

							<div class="settings-item">
								<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-add-container" autocomplete="off" />
								<label class="lbl" for="ace-settings-add-container">
									容器
									<b>居中</b>
								</label>
							</div>
						</div><!-- /.pull-left -->

						<div class="pull-left width-50">
							<div class="settings-item">
								<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" autocomplete="off" />
								<label class="lbl" for="ace-settings-hover"> 子菜单上徘徊</label>
							</div>

							<div class="settings-item">
								<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" autocomplete="off" />
								<label class="lbl" for="ace-settings-compact"> 侧边框紧凑</label>
							</div>

							<div class="settings-item">
								<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" autocomplete="off" />
								<label class="lbl" for="ace-settings-highlight">Alt.活动项目</label>
							</div>
						</div><!-- /.pull-left -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-sm btn-danger pull-right" data-dismiss="modal">
						<i class="ace-icon fa fa-times"></i>
						关闭
					</button>
				</div>
			</div><!-- /.modal-content -->
		</div>
	</div>
	<!-- 设置页面结束 -->
	<!-- 头部结束 -->
	<!-- 菜单、iframe开始 -->
	<div class="main-container ace-save-state" id="main-container">
		<script type="text/javascript">
			try{ace.settings.loadState('main-container')}catch(e){}
		</script>

		<div id="sidebar" class="sidebar responsive ace-save-state">
			<script type="text/javascript">
				try{ace.settings.loadState('sidebar')}catch(e){}
			</script>

			<div class="sidebar-shortcuts" id="sidebar-shortcuts"> 
				<!-- 导航头部 -->
				<div class="sidebar-shortcuts-large" style='line-height:20px;margin-top:5px;width:100%;'>
					 <span class="input-icon">
						<input type="text" placeholder="菜单查询 "  onpropertychange="main.QryMenu(this)" style='width:100%;' />
						 <i class="ace-icon fa fa-search nav-search-icon"></i>
					</span>
				</div>
				<!-- 导航头部小分辨率 -->
				 <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<button class="btn btn-info" style='font-size:14px;'>
						<i class="ace-icon fa fa-search"></i>
					</button>
				</div> 
			</div><!-- /.sidebar-shortcuts -->
			
			<div id="sub_menu"></div>		
			
			<!-- 菜单收缩、展开 -->
			<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
				<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
			</div>
		</div>
		<!-- 菜单栏完 -->
		<div class="main-content">
			<div class="main-content-inner">
				<div class="tabbable">
					<ul id="recent-tab" class="nav nav-tabs padding-12 tab-color-blue background-blue">
						<li id="li_menu02" class="li_menu02 active">
							<a data-toggle="tab" href="#li_menu02-tab">
								<i class="menu-icon glyphicon glyphicon-home"></i>
								首页
							</a>
						</li>
					</ul>
					<div class="tab-content" id="menu_iframe" style="padding:0px;">
						<div id="li_menu02-tab" class="tab-pane active" style="padding:0px;">
							<iframe id="iframe_menu02" src="XTWH/BZXSWH.jsp" width="100%"
							allowtransparency="true" onload="changeFrameHeight(this)" 
							 scrolling="auto" frameborder="0" marginheight="-10" >
							</iframe>
						</div>
					</div>
				</div>
			</div>
		</div><!-- /.main-content -->
	</div><!-- /.main-container -->
	<!-- 菜单、iframe结束-->
	<script type="text/javascript">
		if('ontouchstart' in document.documentElement) 
			document.write("<script src='/LyUI/Origin/bootstrap/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="/LyUI/Origin/bootstrap/js/bootstrap.js"></script>
	<script src="/LyUI/Origin/bootstrap/js/ace-elements.js"></script>
	<script src="/LyUI/Origin/bootstrap/js/ace.js"></script>
</body>
</html>