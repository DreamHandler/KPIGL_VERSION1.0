var YLZBZDWH = Class.create();
YLZBZDWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	initLoad : function(){
		ylzbzd.initCss();
		ylzbzd.inputDis(true);
		ylzbzd.createGrid();
		ylzbzd.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".SetCenter").height(150);
		
		$(".TopGrid").width($(".con").width());
		$(".TopGrid").height($(".con").height()-$(".SetCenter").height()-50);
		$(".fillter,.GridDiv,.SetCenter").width($(".TopGrid").width()-30);
		$(".GridDiv").height($(".TopGrid").height()-$(".fillter").height()-30);
		$(".formDiv").width($(".SetCenter").width()/3 - 3);
		$(".formRight").width($(".formDiv").width() - $(".formLeft").width() - 1);
		$("#Benable").height($("#VName").height() + 2);
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
		
		ylzbzd.BtnChange(3);
	},
	createGrid : function(){
		ylzbzd.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '科室编码', name: 'VNum', width: 80, type: 'int' },
            { display: '科室名称', name: 'VName', width: 160 },
            { display: '拼音码', name: 'VPYM', width: 60 },
            { display: '药占比', name: 'NMedicine', width: 150 },
            { display: '基药比', name: 'MDifficulty', width: 150 },
            { display: '材料占比', name: 'MRiskLevel', width: 150 },
            { display: '可用性', name: 'Benable', width: 80 ,render : ylzbzd.toBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum', 
            pageSizeOptions: [5, 10, 15, 20], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : ylzbzd.grid_onSelectRow,
            onBeforeSelectRow : ylzbzd.grid_disabled
        });
	},
	/**
	 * GRID数据格式化
	 */
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	/**
	 * 收费项目行选中
	 */
	grid_onSelectRow : function(rowData,status){
		ylzbzd.status = status;
		ylzbzd.rowData = rowData;
		ylzbzd.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#NMedicine,#NBasicMedicine,#NMaterial,#Benable,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		ylzbzd.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(ylzbzd.sta == 1){
			alert("请先保存或者取消对医疗指标字典的操作！")
			$("#VNum").focus();
			return false;
		}else if(ylzbzd.sta == 2){
			alert("请先保存或者取消对医疗指标字典的操作！")
			$("#VNum").select();
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 查询
	 */
	LoadData : function(){
		var QryJson = {};
		if($("#valueqry").get(0).checked==true){
			QryJson["ValQry"] = $("#FilValue").val();
		}
		if($("#bitqry").get(0).checked==true){
			QryJson["BENABLE"] = $("input[name='FilBit']:checked").val();
		}
		this.ajaxCall(QryJson,"KPIGL.XTWH.YLZBZDWH","DataQry",ylzbzd.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = ylzbzd.StrToXml(response.responseText);
			}
			ylzbzd.SetGridData(node);
			if(ylzbzd.dataCount != 0){
				if(ylzbzd.dataCount < ylzbzd.selectRowIndex+1){
					ylzbzd.selectRowIndex = 0;
				}
				ylzbzd.grid.select(ylzbzd.selectRowIndex);
			}
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        ylzbzd.dataCount = Djson.length;
        ylzbzd.grid.set({ data: jsonObj }); 
	},
	/**
	 * 复选框控制
	 */
	FilCheClick : function(obj,index,id){
		var check = $("#"+obj.id)[0].checked
		if(index == 1){//控制input
			if(check){
				$("#"+id)[0].disabled = false;
				$("#"+id).focus();
			}else{
				$("#"+id).val("");
				$("#"+id)[0].disabled = true;
			}
		}else if(index == 2){//控制radio
			if(check){
				$("#"+id)[0].disabled = false;
				$("#"+id+"1").focus();
			}else{
				$("#"+id+"1")[0].checked = true;
				$("#"+id)[0].disabled = true;
			}
		}
	},
	/**
	 * 按钮组
	 */
	BtnAdd : function(){
		ylzbzd.sta = 1;
		ylzbzd.BtnChange(2);
		ylzbzd.inputDis(false);
	},
	BtnMod : function(){
		ylzbzd.sta = 2;
		ylzbzd.BtnChange(2);
		ylzbzd.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":ylzbzd.sta};
		$("#VNum,#VName,#NMedicine,#NBasicMedicine,#NMaterial,#Benable,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.YLZBZDWH","DataSave",ylzbzd.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = ylzbzd.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				ylzbzd.BtnCan();
				ylzbzd.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		ylzbzd.sta = 0;
		ylzbzd.inputDis(true);
		ylzbzd.BtnChange(3);
		if(ylzbzd.dataCount != 0 && ylzbzd.dataCount >= ylzbzd.selectRowIndex){
			ylzbzd.grid_onSelectRow(ylzbzd.rowData,ylzbzd.status);
		}
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//新增、修改可用，保存、放弃不可用
			$("#add,#mod").each(function(i,n){
				ylzbzd.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				ylzbzd.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,新增、修改不可用
			$("#sav,#can").each(function(i,n){
				ylzbzd.BtnDisabled(false,n.id);
		    });
			$("#add,#mod").each(function(i,n){
				ylzbzd.BtnDisabled(true,n.id);
		    });
		}if(type == 3){//新增可用，修改、保存、放弃不可用
			$("#add").each(function(i,n){
				ylzbzd.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				ylzbzd.BtnDisabled(true,n.id);
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
	/**
	 * 输入框显隐控制
	 */
	inputDis : function(inputFlag){
		ylzbzd.conditionDis();
		$("#VNum,#VName,#NMedicine,#NBasicMedicine,#NMaterial,#Benable,#VRemarks").each(function(i,n){
				$("#"+n.id).attr("disabled",inputFlag);
		});
		$("#VNum").focus();
		if(ylzbzd.sta == 1){
			$("#NMedicine,#NBasicMedicine,#NMaterial").each(function(i,n){
					$("#"+n.id).val("0.00");
			});
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(ylzbzd.sta == 0){
			$("#valueqry,#bitqry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			ylzbzd.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			ylzbzd.BtnDisabled(true,"Qry");
		}
	}
});
var ylzbzd = new YLZBZDWH();