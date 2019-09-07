var SSXSWH = Class.create();
SSXSWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	initLoad : function(){
		ssxs.initCss();
		ssxs.inputDis(true);
		ssxs.createGrid();
		ssxs.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".SetCenter").height(130);
		
		$(".TopGrid").width($(".con").width());
		$(".TopGrid").height($(".con").height()-$(".SetCenter").height()-50);
		$(".fillter,.GridDiv,.SetCenter").width($(".TopGrid").width()-30);
		$(".GridDiv").height($(".TopGrid").height()-$(".fillter").height()-30);
		$(".formDiv").width($(".SetCenter").width()/3);
		$(".formRight").width($(".formDiv").width() - $(".formLeft").width() - 1);
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
		
		ssxs.BtnChange(3);
		//初始化 只能输入数字
//		Funs.OnInputReg("NOutDoc");
		
	},
	createGrid : function(){
		ssxs.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '手术编码', name: 'VNum', width: 80, type: 'int' },
            { display: '手术名称', name: 'VName', width: 160 },
            { display: '拼音码', name: 'VPYM', width: 160 },
            { display: '分配系数', name: 'NDistribution', width: 110 },
            { display: '可用性', name: 'Benable', width: 60 ,render : ssxs.toBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum',
            pageSize:10,
            pageSizeOptions: [10, 15, 20, 25], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : ssxs.grid_onSelectRow,
            onBeforeSelectRow : ssxs.grid_disabled
        });
	},
	/**
	 * GRID数据格式化
	 */
	toItemType : function(value,col){
		return value.IItemType == "1"? "标准项目":"自定义";
	},
	toProjectType : function(value,col){
		return value.IProjectType == "0"?"不区分":value.IProjectType == "1"? "非手术类":"手术类";
	},
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	/**
	 * 收费项目行选中
	 */
	grid_onSelectRow : function(rowData,status){
		ssxs.status = status;
		ssxs.rowData = rowData;
		ssxs.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#VCODE10,#Benable,#NDistribution,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		ssxs.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(ssxs.sta == 1){
			alert("请先保存或者取消对手术系数的操作！")
			$("#NDistribution").focus();
			return false;
		}else if(ssxs.sta == 2){
			alert("请先保存或者取消对手术系数的操作！")
			$("#NDistribution").select();
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
		this.ajaxCall(QryJson,"KPIGL.XTWH.SSXSWH","DataQry",ssxs.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = ssxs.StrToXml(response.responseText);
			}
			ssxs.SetGridData(node);
			if(ssxs.dataCount != 0){
				if(ssxs.dataCount < ssxs.selectRowIndex+1){
					ssxs.selectRowIndex = 0;
				}
				ssxs.grid.select(ssxs.selectRowIndex);
			}
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        ssxs.dataCount = Djson.length;
        ssxs.grid.set({ data: jsonObj }); 
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
	import : function(){
		$.LyDialog.confirm('导入后数据会全部更新，是否确定导入？', function (bool){
			if(bool){
				ssxs.ajaxCall({},"KPIGL.XTWH.SSXSWH","DataImport",ssxs.importHander,false);
			}
		});
	},
	importHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = ssxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text>="1"){
				alert("导入更新成功！");
				ssxs.LoadData();
			}else{
				alert("导入更新失败！");
			}
		}
	},
	BtnAdd : function(){
		ssxs.sta = 1;
		ssxs.BtnChange(2);
		ssxs.inputDis(false);
	},
	BtnMod : function(){
		ssxs.sta = 2;
		ssxs.BtnChange(2);
		ssxs.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":ssxs.sta};
		$("#VNum,#VName,#VCODE10,#Benable,#NDistribution,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.SSXSWH","DataSave",ssxs.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = ssxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				ssxs.BtnCan();
				ssxs.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		ssxs.sta = 0;
		ssxs.BtnChange(3);
		ssxs.inputDis(true);
		if(ssxs.dataCount != 0 && ssxs.dataCount >= ssxs.selectRowIndex){
			ssxs.grid_onSelectRow(ssxs.rowData,ssxs.status);
		}
		
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//导入更新、新增、修改可用，保存、放弃不可用
			$("#import,#add,#mod").each(function(i,n){
				ssxs.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				ssxs.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,导入更新、新增、修改不可用
			$("#sav,#can").each(function(i,n){
				ssxs.BtnDisabled(false,n.id);
		    });
			$("#import,#add,#mod").each(function(i,n){
				ssxs.BtnDisabled(true,n.id);
		    });
		}else if(type == 3){//导入更新、新增可用，修改、保存、放弃不可用
			$("#import,#add").each(function(i,n){
				ssxs.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				ssxs.BtnDisabled(true,n.id);
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
		ssxs.conditionDis();
		$("#Benable,#NDistribution,#VRemarks").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
		});
		$("#NDistribution").focus();
		if(ssxs.sta == 1){
			$("#NDistribution").each(function(i,n){
					$("#"+n.id).val("0.00");
			});
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(ssxs.sta == 0){
			$("#valueqry,#bitqry,#Qry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			ssxs.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			ssxs.BtnDisabled(true,"Qry");
		}
	}
});
var ssxs = new SSXSWH();