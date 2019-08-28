var SFXMWH = Class.create();
SFXMWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	initLoad : function(){
		sfxm.initCss();
		sfxm.inputDis(true);
		sfxm.createGrid();
		sfxm.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".SetCenter").height(150);
		
		$(".TopGrid").width($(".con").width());
		$(".TopGrid").height($(".con").height()-$(".SetCenter").height()-50);
		$(".fillter,.GridDiv,.SetCenter").width($(".TopGrid").width()-30);
		$(".GridDiv").height($(".TopGrid").height()-$(".fillter").height()-30);
		$(".formDiv").width($(".SetCenter").width()/4);
		$(".formRight").width($(".formDiv").width() - $(".formLeft").width() - 1);
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
		
		sfxm.BtnChange(3);
	},
	createGrid : function(){
		sfxm.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '项目编码', name: 'VNum', width: 80, type: 'int' },
            { display: '项目名称', name: 'VName', width: 160 },
            { display: '拼音码', name: 'VPYM', width: 60 },
            { display: '项目类型', name: 'IItemType', width: 80 ,render : sfxm.toItemType},
            { display: '项目种类', name: 'IProjectType', width: 80 ,render : sfxm.toProjectType},
            { display: '可用性', name: 'Benable', width: 60 ,render : sfxm.toBenable},
            { display: '门诊医生点数', name: 'NOutDoc', width: 120 },
            { display: '临床医生点数', name: 'NClinician', width: 120 },
            { display: '麻醉师点数', name: 'NAnesthetist', width: 100 },
            { display: '检验科室点数', name: 'NInspection', width: 120 },
            { display: '病区护士点数', name: 'NWardNurses', width: 120 },
            { display: '病区手术室护士点数', name: 'NWardRoomNurse', width: 160 },
            { display: '门诊手术室护士点数', name: 'NOutRoomNurse', width: 160 },
            { display: '准分子护士点数', name: 'NExcimerNurse', width: 120 },
            { display: '美容中心护士点数', name: 'NBeautyCentre', width: 140 }
            ], width: $(".GridDiv").width(), pkName: 'VNum', 
            pageSizeOptions: [5, 10, 15, 20], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : sfxm.grid_onSelectRow,
            onBeforeSelectRow : sfxm.grid_disabled
        });
	},
	/**
	 * GRID数据格式化
	 */
	toItemType : function(value,col){
		return value.IItemType == "1"? "标准项目":"自定义";
	},
	toProjectType : function(value,col){
		return value.IProjectType == "1"? "非手术类":"手术类";
	},
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	/**
	 * 收费项目行选中
	 */
	grid_onSelectRow : function(rowData,status){
		sfxm.status = status;
		sfxm.rowData = rowData;
		sfxm.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#IItemType,#IProjectType,#Benable,#NOutDoc,#NClinician" +
			",#NAnesthetist,#NInspection,#NWardNurses,#NWardRoomNurse,#NOutRoomNurse" +
			",#NExcimerNurse,#NBeautyCentre").each(function(i,n){
				if(n.id == "IItemType" || n.id == "IProjectType" || n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		sfxm.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(sfxm.sta == 1){
			alert("请先保存或者取消对收费项目的操作！")
			$("#VName").focus();
			return false;
		}else if(sfxm.sta == 2){
			alert("请先保存或者取消对收费项目的操作！")
			$("#VName").select();
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
		this.ajaxCall(QryJson,"KPIGL.XTWH.SFXMWH","DataQry",sfxm.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = sfxm.StrToXml(response.responseText);
			}
			sfxm.SetGridData(node);
			if(sfxm.dataCount != 0){
				if(sfxm.dataCount < sfxm.selectRowIndex+1){
					sfxm.selectRowIndex = 0;
				}
				sfxm.grid.select(sfxm.selectRowIndex);
			}
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        sfxm.dataCount = Djson.length;
        sfxm.grid.set({ data: jsonObj }); 
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
		sfxm.sta = 1;
		sfxm.BtnChange(2);
		sfxm.inputDis(false);
	},
	BtnMod : function(){
		sfxm.sta = 2;
		sfxm.BtnChange(2);
		sfxm.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":sfxm.sta};
		$("#VNum,#VName,#IItemType,#IProjectType,#Benable,#NOutDoc,#NClinician" +
			",#NAnesthetist,#NInspection,#NWardNurses,#NWardRoomNurse,#NOutRoomNurse" +
			",#NExcimerNurse,#NBeautyCentre").each(function(i,n){
				if(n.id == "IItemType" || n.id == "IProjectType" || n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.SFXMWH","DataSave",sfxm.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = sfxm.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				sfxm.BtnCan();
				sfxm.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		sfxm.sta = 0;
		sfxm.BtnChange(3);
		sfxm.inputDis(true);
		if(sfxm.dataCount != 0 && sfxm.dataCount >= sfxm.selectRowIndex){
			sfxm.grid_onSelectRow(sfxm.rowData,sfxm.status);
		}
		
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//新增、修改可用，保存、放弃不可用
			$("#add,#mod").each(function(i,n){
				sfxm.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				sfxm.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,新增、修改不可用
			$("#sav,#can").each(function(i,n){
				sfxm.BtnDisabled(false,n.id);
		    });
			$("#add,#mod").each(function(i,n){
				sfxm.BtnDisabled(true,n.id);
		    });
		}else if(type == 3){//新增可用，修改、保存、放弃不可用
			$("#add").each(function(i,n){
				sfxm.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				sfxm.BtnDisabled(true,n.id);
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
		sfxm.conditionDis();
		$("#VName,#IItemType,#IProjectType,#Benable,#NOutDoc,#NClinician" +
			",#NAnesthetist,#NInspection,#NWardNurses,#NWardRoomNurse,#NOutRoomNurse" +
			",#NExcimerNurse,#NBeautyCentre").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
		});
		var value = $('input:radio[name="IItemType"]:checked').val();
		$("#IItemType"+value).focus();
		if(sfxm.sta == 1){
			$("#NOutDoc,#NClinician,#NAnesthetist,#NInspection,#NWardNurses,#NWardRoomNurse" +
					",#NOutRoomNurse,#NExcimerNurse,#NBeautyCentre").each(function(i,n){
					$("#"+n.id).val("0.00");
			});
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(sfxm.sta == 0){
			$("#valueqry,#bitqry,#Qry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			sfxm.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			sfxm.BtnDisabled(true,"Qry");
		}
	}
});
var sfxm = new SFXMWH();