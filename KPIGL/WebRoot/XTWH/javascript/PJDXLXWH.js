var PJDXLXWH = Class.create();
PJDXLXWH.prototype = Object.extend(new LBase(), {
	grid : null,
	initLoad : function(){
		dxlxwh.initCss();
		dxlxwh.createGrid();
		dxlxwh.LoadData();
	},
	/**
	 * 初始化页面布局
	 */
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".TopGrid").width(550);
		$(".TopGrid").height(bheight - 20);
		$(".GridDiv").width($(".TopGrid").width());
		$(".GridDiv").height($(".TopGrid").height() + 1);
		//
		$(".SetCenter").width(bwidth - $(".TopGrid").width() - 34);
		$(".SetCenter").height($(".TopGrid").height());
		$(".formDiv").width($(".SetCenter").width());
		$(".formRight").width($(".SetCenter").width() - $(".formLeft").width() -120);
		
		$(".BtnFoot").width($(".SetCenter").width());
		$(".BtnFoot").height(50);
		
		dxlxwh.BtnChange(1);
	},
	/**
	 * 初始化GIRD控件
	 */
	createGrid : function(){
		dxlxwh.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '编码', name: 'VNum', width: 80, type: 'int' },
            { display: '主管单位', name: 'VGoverningBody', width: 200 },
            { display: '名称', name: 'VName', width: 200 },
            { display: '是否可用', name: 'Benable', width: 70 ,format : dxlxwh.toBenable}
            ], width: $(".TopGrid").width(), pkName: 'id', pageSizeOptions: [5, 10, 15, 20], height: $(".TopGrid").height()
        });
	},
	/**
	 * 查询数据
	 */
	LoadData : function(){
		var QryJson = {};
		this.ajaxCall(QryJson,"KPIGL.XTWH.PJDXLXWH","DataQry",dxlxwh.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = dxlxwh.StrToXml(response.responseText);
			}
//			alert(node.xml);
			dxlxwh.SetGridData(node);
		}
	},
	/**
	 * 将后端返回数据转化为grid数据格式
	 */
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        dxlxwh.grid.set({ data: jsonObj }); 
	},
	/**
	 * 可用性转化
	 */
	toBenable : function(obj){
		
	},
	/**
	 * 按钮组
	 */
	BtnAdd : function(){
		dxlxwh.BtnChange(2);
	},
	BtnMod : function(){
		dxlxwh.BtnChange(2);
	},
	BtnSav : function(){
		var QryJson = {};
		this.ajaxCall(QryJson,"KPIGL.XTWH.PJDXLXWH","DataSave",dxlxwh.DataHander,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = dxlxwh.StrToXml(response.responseText);
			}
//			alert(node.xml);
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				dxlxwh.BtnCan();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		dxlxwh.BtnChange(1);
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//新增、修改可用，保存、放弃不可用
			$("#add,#mod").each(function(i,n){
				dxlxwh.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				dxlxwh.BtnDisabled(true,n.id);
		    });
		}
		if(type == 2){//保存、放弃可用,新增、修改不可用
			$("#sav,#can").each(function(i,n){
				dxlxwh.BtnDisabled(false,n.id);
		    });
			$("#add,#mod").each(function(i,n){
				dxlxwh.BtnDisabled(true,n.id);
		    });
		}
	},
	/**
	 * 按钮样式控制，以后做成通用版
	 */
	BtnDisabled : function(flag,Uid){
		$("#"+Uid).attr("disabled",flag);
		$("#"+Uid).css("background-image","url('source/images/button"+(flag?"_dis":"")+".png')");
		$("#"+Uid).css("cursor",flag?"":"pointer");
	},
	BtnMove : function(stat,obj){
		if(stat==1){
			$(obj).css("background-image","url('source/images/button_over.png')");
		}else{
			$(obj).css("background-image","url('source/images/button.png')");
		}
	}
});
var dxlxwh = new PJDXLXWH();