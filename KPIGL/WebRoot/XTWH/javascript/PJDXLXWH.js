var PJDXLXWH = Class.create();
PJDXLXWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null,
	status : "",
	initLoad : function(){
		dxlxwh.initCss();
		dxlxwh.inputDis(true);
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
		$(".formRight").width($(".SetCenter").width() - $(".formLeft").width() );
		
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
            { display: '编码', name: 'VNum', width: 79, type: 'int' },
            { display: '主管单位', name: 'VGoverningBody', width: 199 ,render : dxlxwh.toGoverningBody},
            { display: '名称', name: 'VName', width: 199 },
            { display: '是否可用', name: 'Benable', width: 69 ,render : dxlxwh.toBenable}
            ], width: $(".TopGrid").width(), pkName: 'VNum'
            , pageSizeOptions: [5, 10, 15, 20], height: $(".TopGrid").height(),
            //grid 点击事件
            onSelectRow : dxlxwh.grid_onSelectRow,
            onBeforeSelectRow : dxlxwh.grid_disabled
        });
	},
	/**
	 * 评价对象类型行选中
	 */
	grid_onSelectRow : function(rowData,status){
		dxlxwh.status = status;
		dxlxwh.rowData = rowData;
		dxlxwh.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#VGoverningBody,#VEpName,#VSQL,#VClassEpNum,#VClassSQL" +
			",#VCubeNum,#VDIM,#Benable,#BDefaultLoad").each(function(i,n){
				if(n.id == "Benable" || n.id=="BDefaultLoad"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(dxlxwh.sta == 1){
			alert("请先保存或者取消对评价对象类型的操作！")
			$("#VName").focus();
			return false;
		}else if(dxlxwh.sta == 2){
			alert("请先保存或者取消对评价对象类型的操作！")
			$("#VName").select();
			return false;
		}else{
			return true;
		}
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
			dxlxwh.SetGridData(node);
			dxlxwh.grid.select(dxlxwh.selectRowIndex);
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
	 * 可用性转化,无效
	 */
	toGoverningBody : function(value,col){
		return value.VGoverningBody == "1"? "医院":"机构";
	},
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
		
	},
	/**
	 * 按钮组
	 */
	BtnAdd : function(){
		dxlxwh.sta = 1;
		dxlxwh.BtnChange(2);
		dxlxwh.inputDis(false);
		this.ajaxCall({},"KPIGL.XTWH.PJDXLXWH","GetVNum",dxlxwh.GetVNumHander,false);
	},
	GetVNumHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = dxlxwh.StrToXml(response.responseText);
			}
			var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
			$("#VNum").val(FieldsValue[0].getAttribute("maxVNum"))
			//将其他赋默认值
			$("#VName,#VGoverningBody,#VEpName,#VSQL,#VClassEpNum,#VClassSQL" +
			",#VCubeNum,#VDIM,#Benable,#BDefaultLoad").each(function(i,n){
				if(n.id == "Benable" || n.id=="BDefaultLoad"){
					$("#"+n.id+"1")[0].checked = true;
				}else if(n.id == "VGoverningBody"){
					$("#"+n.id).val("1");
				}else{
					$("#"+n.id).val("");
				}
			})
			$("#VName").focus();
		}
	},
	BtnMod : function(){
		dxlxwh.sta = 2;
		dxlxwh.BtnChange(2);
		dxlxwh.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":dxlxwh.sta};
		$("#VNum,#VName,#VGoverningBody,#VEpName,#VSQL,#VClassEpNum,#VClassSQL" +
			",#VCubeNum,#VDIM,#Benable,#BDefaultLoad").each(function(i,n){
				if(n.id == "Benable" || n.id=="BDefaultLoad"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val()
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.PJDXLXWH","DataSave",dxlxwh.BtnSavHandle,false);
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
				dxlxwh.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		dxlxwh.sta = 0;
		dxlxwh.BtnChange(1);
		dxlxwh.inputDis(true);
		dxlxwh.grid_onSelectRow(dxlxwh.rowData,dxlxwh.status)
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
	},
	inputDis : function(inputflag){
		$("#VName,#VGoverningBody,#VEpName,#VSQL,#VClassEpNum,#VClassSQL" +
				",#VCubeNum,#VDIM,#Benable,#BDefaultLoad").each(function(i,n){
					$("#"+n.id).attr("disabled",inputflag);
	    });
	}
});
var dxlxwh = new PJDXLXWH();