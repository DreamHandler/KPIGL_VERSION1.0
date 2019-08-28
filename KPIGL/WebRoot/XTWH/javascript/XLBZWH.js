var XLBZWH = Class.create();
XLBZWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	initLoad : function(){
		xlbz.initCss();
		xlbz.conditionDis();
		xlbz.inputDis(true);
		xlbz.createGrid();
		xlbz.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".SetCenter").height(150);
		
		$(".TopGrid").width($(".con").width());
		$(".TopGrid").height($(".con").height()-$(".SetCenter").height()-50);
		$(".fillter,.GridDiv,.SetCenter").width($(".TopGrid").width()-30);
		$(".GridDiv").height($(".TopGrid").height()-$(".fillter").height()-30);
		$(".formDiv").width($(".SetCenter").width()/3);
		$(".formRight").width($(".formDiv").width() - $(".formLeft").width() - 1);
		$("#IProjectType").height($("#VName").height() + 2);
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
		
		xlbz.BtnChange(3);
	},
	createGrid : function(){
		xlbz.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '科室编码', name: 'VNum', width: 80, type: 'int' },
            { display: '科室名称', name: 'VName', width: 160 },
            { display: '拼音码', name: 'VPYM', width: 60 },
            { display: '项目类型', name: 'IProjectType', width: 120 ,render : xlbz.toProjectType},
            { display: '项目次数金额', name: 'MNumber', width: 150 ,render : xlbz.toMNumber},
            { display: '项目难度金额', name: 'MDifficulty', width: 150 ,render : xlbz.toMDifficulty},
            { display: '风险程度金额', name: 'MRiskLevel', width: 150 ,render : xlbz.toMRiskLevel},
            { display: '可用性', name: 'Benable', width: 80 ,render : xlbz.toBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum', 
            pageSizeOptions: [5, 10, 15, 20], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : xlbz.grid_onSelectRow,
            onBeforeSelectRow : xlbz.grid_disabled
        });
	},
	/**
	 * GRID数据格式化
	 */
	toProjectType : function(value,col){
		return value.IProjectType == "0"? "不区分":value.IProjectType == "1"? "非手术类":"手术类";
	},
	toMNumber : function(value,col){
		var val = value.MNumber;
		return val.substring(0,val.length - 2);
	},
	toMDifficulty : function(value,col){
		var val = value.MDifficulty;
		return val.substring(0,val.length - 2);
	},
	toMRiskLevel : function(value,col){
		var val = value.MRiskLevel;
		return val.substring(0,val.length - 2);
	},
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	/**
	 * 收费项目行选中
	 */
	grid_onSelectRow : function(rowData,status){
		xlbz.status = status;
		xlbz.rowData = rowData;
		xlbz.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#IProjectType,#MNumber,#MDifficulty,#MRiskLevel,#Benable,#VRemarks").each(function(i,n){
				if(n.id=="IProjectType" || n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else if(n.id=="MNumber" || n.id=="MDifficulty" || n.id=="MRiskLevel"){
					var val = rowData[n.id];
					$("#"+n.id).val(val.substring(0,val.length - 2));
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		xlbz.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(xlbz.sta == 1){
			alert("请先保存或者取消对效率标准的操作！")
			$("#VNum").focus();
			return false;
		}else if(xlbz.sta == 2){
			alert("请先保存或者取消对效率标准的操作！")
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
		this.ajaxCall(QryJson,"KPIGL.XTWH.XLBZWH","DataQry",xlbz.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = xlbz.StrToXml(response.responseText);
			}
			xlbz.SetGridData(node);
			if(xlbz.dataCount != 0){
				if(xlbz.dataCount < xlbz.selectRowIndex+1){
					xlbz.selectRowIndex = 0;
				}
				xlbz.grid.select(xlbz.selectRowIndex);
			}
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        xlbz.dataCount = Djson.length;
        xlbz.grid.set({ data: jsonObj }); 
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
		xlbz.sta = 1;
		xlbz.BtnChange(2);
		xlbz.conditionDis();
		xlbz.inputDis(false);
	},
	BtnMod : function(){
		xlbz.sta = 2;
		xlbz.BtnChange(2);
		xlbz.conditionDis();
		xlbz.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":xlbz.sta};
		$("#VNum,#VName,#IProjectType,#MNumber,#MDifficulty,#MRiskLevel,#Benable,#VRemarks").each(function(i,n){
				if(n.id=="IProjectType" || n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.XLBZWH","DataSave",xlbz.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = xlbz.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				xlbz.BtnCan();
				xlbz.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		xlbz.sta = 0;
		xlbz.conditionDis();
		xlbz.inputDis(true);
		xlbz.BtnChange(3);
		if(xlbz.dataCount != 0 && xlbz.dataCount >= xlbz.selectRowIndex){
			xlbz.grid_onSelectRow(xlbz.rowData,xlbz.status);
		}
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//新增、修改可用，保存、放弃不可用
			$("#add,#mod").each(function(i,n){
				xlbz.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				xlbz.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,新增、修改不可用
			$("#sav,#can").each(function(i,n){
				xlbz.BtnDisabled(false,n.id);
		    });
			$("#add,#mod").each(function(i,n){
				xlbz.BtnDisabled(true,n.id);
		    });
		}if(type == 3){//新增可用，修改、保存、放弃不可用
			$("#add").each(function(i,n){
				xlbz.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				xlbz.BtnDisabled(true,n.id);
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
	inputDis : function(inputflag){
		$("#VNum,#VName,#IProjectType,#MNumber,#MDifficulty,#MRiskLevel,#Benable,#VRemarks").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
		});
		var value = $('input:radio[name="IProjectType"]:checked').val();
		$("#IProjectType"+value).focus();
		if(xlbz.sta == 1){
			$("#MNumber,#MDifficulty,#MRiskLevel").each(function(i,n){
					$("#"+n.id).val("0.00");
			});
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(xlbz.sta == 0){
			$("#valueqry,#bitqry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			xlbz.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			xlbz.BtnDisabled(true,"Qry");
		}
	}
});
var xlbz = new XLBZWH();