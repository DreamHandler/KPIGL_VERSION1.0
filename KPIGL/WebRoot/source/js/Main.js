var Main = Class.create();
Main.prototype = Object.extend(new LBase(), {
	recent_tab_width : 0,
	InitLoad : function(){
		main.recent_tab_width = $("#recent-tab").width() - $("#li_menu02").width() ;
		this.getFirstMenu();
		this.getSubMenu(2);
		//设定默认皮肤样式
		var o=document.getElementById("skin-colorpicker");
		if ("createEvent" in document) {
			 var evt = document.createEvent("HTMLEvents");
			 evt.initEvent("change", false, true);
			 o.dispatchEvent(evt);
		}else{
			o.fireEvent("onchange");
		}
		 
	},
	goLocation : function(obj){//点击菜单事件
		var sender =$(obj);
		var menuLi = $("#mainmenu").find("li,.active");
		var menuClass = $(menuLi[0]).attr('class');
		if(menuClass.indexOf('hover')>-1){
			menuLi.attr('class','hover');
		}else{
			menuLi.attr('class','');
		}
		
		sender.parent().addClass('active');
		var parent = sender.parent();
		
		while(parent.parent().attr('id')!='mainmenu'){
			parent=parent.parent().parent();
			parent.addClass('active open');
		}
		
		//判断页面是否存在，不存在则新建，存在则跳转
		var  menu_name= sender.attr("patch").split(",");
		var  li_id= "li_"+sender.parent().attr("id");
		if($("."+li_id).length!=0){
			$("."+li_id+" a")[0].click();
		}else{
			/**
			 * 新增一个li标签
			 * <li>
			 * 		<a data-toggle="tab" href="#member-tab">Members</a>
			 * </li>
			 */
			var temp = $("<li/>");
			temp.attr("id",li_id)
			temp.addClass(li_id);
			var a = $("<a/>");
			a.attr("data-toggle","tab");
			a.attr("href","#"+li_id+"-tab");
			a.text(menu_name[menu_name.length-1]);
			//关闭
			/**
			 * <i id="close_menu02" title="关闭菜单" class="ace-icon glyphicon glyphicon-remove close_li_iframe" 
			 * onclick="main.close(this)" >
			 * </i>
			 */
			var close_I = $("<i/>")
			close_I.attr("id","close_"+li_id.substring(3));
			close_I.attr("title","关闭菜单");
			close_I.addClass("ace-icon");
			close_I.addClass("glyphicon");
			close_I.addClass("glyphicon-remove");
			close_I.addClass("close_li_iframe");
			close_I.attr("onclick","main.close(this)");
			close_I.css("cursor","pointer");
			//绑定iframe关闭图标  鼠标样式
			close_I.hover(function(n){
				close_I.addClass("red");
			},function(n){
				close_I.removeClass("red");
			})
			a.append(close_I);
			temp.append(a);
			$("#recent-tab").append(temp);
			/**
			 * 新增一个iframe标签
			 * <div id="member-tab" class="tab-pane">
			 * 		<iframe id="iframe_menu04" onload="changeFrameHeight(this)"  src="UItest/firstpage.jsp" width="100%" 
			 * 		allowtransparency="true" 
			 * 		scrolling="auto" frameborder="0">
			 * 		</iframe>
			 * </div>
			 */
			var iframe_div = $("<div/>");
			iframe_div.addClass("tab-pane");
			iframe_div.attr("id",li_id+"-tab");
			var new_iframe = $("<iframe/>");
			new_iframe.attr("id","iframe_"+li_id);
			new_iframe.attr("onload","changeFrameHeight(this)");
			new_iframe.attr("src",sender.attr("href"));
			new_iframe.attr("width","100%");
			//将首页的高度赋值给新增的 iframe
			new_iframe.attr("height",$("#menu_iframe").height() - 5);
			new_iframe.attr("allowtransparency","true");
			new_iframe.attr("scrolling","auto");
			new_iframe.attr("frameborder","0");
			iframe_div.append(new_iframe);
			$("#menu_iframe").append(iframe_div);
			//聚焦到新打开的页面
			a.click();
			//判断是否有足够空间展示页面
			main.recent_tab_width = main.recent_tab_width - $("#"+li_id).width() + 1;
			if(main.recent_tab_width<=0){
				close_I.click();
				alert("打开页面太多，请先关闭一些页面再打开新页面！");
			}
		}
		return false;
	},
	QryMenu : function(div){
		var val = $(div).val().replace(/\s/g,"");
		if(val == ""){
			var li = $('#mainmenu li')
			li.show();
		}else{
			var li = $('#mainmenu>li');
			for(var i = 0;i<li.length;i+=1){
				var bool = this.chs(li[i],val);
				if(bool){
					$(li[i]).show();
				}else{
					$(li[i]).hide();
				}
			}
		}
	},
	chs : function(li,tex){
		var ul = $(li).children('ul');
		if(ul.length>0){
			var child = $(ul[0]).children('li');
			var tag = false;
			for(var i = 0;i<child.length;i+=1){
				var bool = this.chs(child[i],tex);
				if(bool){
					tag = true;
				}
			}
			if(tag){
				$(li).show();
			}else{
				$(li).hide();
			}
			return tag;
		}else{
			var val = $(li).children('a').text();
			if(val == ''){
				val = $(li).children('a').children('span').text();
			}
			if(val.indexOf(tex)>=0){
				return true
			}else{
				return false
			}
		}
	},
	close : function(obj){
		var id = obj.id;
		var li_id = "li_"+id.substring(6);
		var li_Obj = document.getElementById(li_id);
		//删除当前页，显示上一个兄弟节点数据
		if($("#"+li_id).hasClass("active")){
			var last_li_Obj = $("#li_"+id.substring(6)).prev();
			$("#"+last_li_Obj[0].id).find("a")[0].click();
		}
		//移除改li节点
		var removeWidth = $("#"+li_id).width();
		li_Obj.parentNode.removeChild(li_Obj);
		main.recent_tab_width = main.recent_tab_width + removeWidth;
		//移除改iframe节点
		var iframe_Obj = document.getElementById("li_"+id.substring(6)+"-tab");
		iframe_Obj.parentNode.removeChild(iframe_Obj);
	},
	getFirstMenu : function(){
		var QryJson={};
		this.ajaxCall(QryJson,"com.MFuns.MSingleFuns","getFisrtMenu",main.getFirstMenuHander,false);
	},
	getFirstMenuHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = main.StrToXml(response.responseText);
			}
			$("#first-menu").html(node.xml);
		}
	},
	getSubMenu : function(IXH){
		var QryJson={"IXH":IXH};
		this.ajaxCall(QryJson,"com.MFuns.MSingleFuns","getMenu",main.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = main.StrToXml(response.responseText);
			}
			$("#sub_menu").html(node.xml);
		}
	}
});
var main = new Main();