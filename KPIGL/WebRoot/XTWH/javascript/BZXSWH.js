var BZXSWH = Class.create();
BZXSWH.prototype = Object.extend(new LBase(), {
	FZgrid : null, // 分组grid
	grid : null, // 病种grid
	sta : 0, //0-取消；1-新增；2-修改
	FZselectRowIndex : 0, //分组聚焦行数
	FZrowData : null, //分组grid聚焦数据
	FZstatus : "",  
	FZdataCount : 0, // 分组数据
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	focusSta : 1, //聚焦grid类型，1-分组grid，2-疾病grid
	AllBZsData : {}, //所有的病种信息
	initLoad : function(){
		bzxs.initCss();
		bzxs.inputDis(true);
		bzxs.createGrid();
		bzxs.LoadDataFZ();
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
		
		bzxs.BtnChange(3);
		//初始化 只能输入数字
//		Funs.OnInputReg("NOutDoc");
		
	},
	createGrid : function(){
		bzxs.FZgrid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '分组编码', name: 'VNum', width: 80, type: 'int' },
            { display: '分组名称', name: 'VName', width: 160 },
            { display: '拼音码', name: 'VPYM', width: 160 },
            { display: '可用性', name: 'Benable', width: 60 ,render : bzxs.toBenable},
            { display: '通用系数', name: 'NGeneral', width: 110 },
            { display: '是否使用通用系数', name: 'BUseGeneral', width: 160 ,render : bzxs.toGeneralBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum',
            pageSize:10,
            pageSizeOptions: [10, 15, 20, 25], 
            height: $(".GridDiv").height()-1,
            detail: { onShowDetail: bzxs.f_showBZ,onExtend:bzxs.onExtend,onCollapse:bzxs.onCollapse,height:'auto' },
            //grid 点击事件
            onSelectRow : bzxs.FZgrid_onSelectRow,
            onBeforeSelectRow : bzxs.FZgrid_disabled
        });
	},
	onExtend : function(row, detailPanel,callback){
		bzxs.FZgrid.select(row["__index"]);
		bzxs.FZgrid_onSelectRow(row,row["_status"])
	},
	onCollapse : function(row, detailPanel,callback){
		bzxs.FZgrid.select(row["__index"]);
		bzxs.FZgrid_onSelectRow(row,row["_status"])
	},
	//获取分组下对应的病种
	f_getBZsData:function(CFZBM){
		var data = { Rows: [] };
        for (var i = 0; i < bzxs.AllBZsData.Rows.length; i++){
			if (bzxs.AllBZsData.Rows[i].VGroupNum == CFZBM)
				data.Rows.push(bzxs.AllBZsData.Rows[i]);
        }
        return data;
    },
    //显示病种信息
    f_showBZ : function(row, detailPanel,callback){
		var detailgrid = document.createElement('div'); 
		$(detailgrid).css('margin',10);
        $(detailPanel).append(detailgrid);
        bzxs.grid = $(detailgrid).LyGrid({
			columns:[
            { display: '病种编码', name: 'VNum', width: 80, type: 'int' },
			{ display: '病种名称', name: 'VName', width: 160 },
			{ display: '拼音码', name: 'VPYM', width: 160 },
			{ display: 'CODE10', name: 'VCODE10', width: 80 },
			{ display: '分配系数', name: 'NDistribution', width: 110 },
			{ display: '可用性', name: 'Benable', width: 60 ,render : bzxs.toBenable}
             ], isScroll: false, 
			 showToggleColBtn: false,
            data: bzxs.f_getBZsData(row.VNum) ,
			showTitle: false, 
			onAfterShowData: callback,
			frozen:false,
			//grid 点击事件
            onSelectRow : bzxs.grid_onSelectRow,
            onBeforeSelectRow : bzxs.grid_disabled
        });  
    },
	/**
	 * GRID数据格式化
	 */
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	toGeneralBenable : function(value,col){
		return value.BUseGeneral == "1"? "使用":"不使用";
	},
	/**
	 * 病种分组行选中
	 */
	FZgrid_onSelectRow : function(rowData,status){
//		alert(status)
//		for(row in rowData){
//			alert(row)
//		}
		if(bzxs.focusSta == 2){
			bzxs.grid.unselect(bzxs.selectRowIndex);
		}
		bzxs.focusSta = 1;
		$("#fz_info").css("display","block");
		$("#bz_info").css("display","none");
		$("#addBZ").each(function(i,n){
			bzxs.BtnDisabled(false,n.id);
	    });
		bzxs.FZstatus = status;
		bzxs.FZrowData = rowData;
		bzxs.FZselectRowIndex = rowData["__index"];
		$("#VNum_fz,#VName_fz,#Benable_fz,#NGeneral_fz,#BUseGeneral_fz").each(function(i,n){
			var rowIndex = n.id.replace("_fz","");
			if(n.id=="Benable_fz" || n.id=="BUseGeneral_fz"){
				$("#"+n.id+rowData[rowIndex])[0].checked = true;
			}else{
				$("#"+n.id).val(rowData[rowIndex]);
			}
		});
		bzxs.BtnChange(1);
	},
	/**
	 * 病种行选中
	 */
	grid_onSelectRow : function(rowData,status){
		bzxs.focusSta = 2;
		$("#fz_info").css("display","none");
		$("#bz_info").css("display","block");
		bzxs.FZgrid.unselect(bzxs.FZselectRowIndex);
		$("#addBZ").each(function(i,n){
			bzxs.BtnDisabled(true,n.id);
	    });
		bzxs.status = status;
		bzxs.rowData = rowData;
		bzxs.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#VCODE10,#Benable,#NDistribution,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		bzxs.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(bzxs.focusSta == 1){
			if(bzxs.sta == 1){
				alert("请先保存或者取消对病种分组的操作！")
				$("#NGeneral_fz").focus();
				return false;
			}else if(bzxs.sta == 2){
				alert("请先保存或者取消对病种分组的操作！")
				$("#NGeneral_fz").select();
				return false;
			}else{
				return true;
			}
		}else if(bzxs.focusSta == 1){
			if(bzxs.sta == 1){
				alert("请先保存或者取消对病种信息的操作！")
				$("#NDistribution").focus();
				return false;
			}else if(bzxs.sta == 2){
				alert("请先保存或者取消对病种信息的操作！")
				$("#NDistribution").select();
				return false;
			}else{
				return true;
			}
		}
	},
	/**
	 * 查询分组
	 */
	LoadDataFZ : function(){
		var QryJson = {};
		if($("#valueqry").get(0).checked==true){
			QryJson["ValQry"] = $("#FilValue").val();
		}
		if($("#bitqry").get(0).checked==true){
			QryJson["BENABLE"] = $("input[name='FilBit']:checked").val();
		}
		this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataQryFZ",bzxs.FZDataHander,false);
	},
	FZDataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzxs.StrToXml(response.responseText);
			}
			bzxs.SetGridDataFZ(node);
			if(bzxs.FZdataCount != 0){
				if(bzxs.FZdataCount < bzxs.FZselectRowIndex+1){
					bzxs.FZselectRowIndex = 0;
				}
				bzxs.FZgrid.select(bzxs.FZselectRowIndex);
			}
			bzxs.LoadData(); //查询病种信息
		}
	},
	SetGridDataFZ : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        bzxs.FZdataCount = Djson.length;
        bzxs.FZgrid.set({ data: jsonObj }); 
	},
	/**
	 * 查询病种
	 */
	LoadData : function(){
		var QryJson = {};
		this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataQry",bzxs.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzxs.StrToXml(response.responseText);
			}
			bzxs.SetGridData(node);
		}
	},
	SetGridData : function(node){
		var Djson = GridXmlToJson.Change(node);
		bzxs.AllBZsData.Rows = Djson;
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
				bzxs.ajaxCall({},"KPIGL.XTWH.BZXSWH","DataImport",bzxs.importHander,false);
			}
		});
	},
	importHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text>="1"){
				alert("导入更新成功！");
				bzxs.LoadData();
			}else{
				alert("导入更新失败！");
			}
		}
	},
	BtnAdd : function(){
		bzxs.sta = 1;
		bzxs.BtnChange(2);
		bzxs.inputDis(false);
	},
	/**
	 * 添加病种
	 */
	addBZ : function(){
		var ret = $.LyDialog.open({
            height:600,
            width: 800,
            title : '病种信息',
            url: 'XTWH/BZLB.jsp', 
            showMax: false,
            showToggle: false,
            showMin: false,
            isResize: true,
            slide: false,
            data: {
                name: ""
            },
            //自定义参数
            VGroupNum: bzxs.FZrowData["VNum"],
            NGeneral:bzxs.FZrowData["NGeneral"]
        });
	},
	BtnMod : function(){
		bzxs.sta = 2;
		bzxs.BtnChange(2);
		bzxs.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":bzxs.sta};
		if(bzxs.focusSta == 1){
			$("#VNum_fz,#VName_fz,#Benable_fz,#NGeneral_fz,#BUseGeneral_fz").each(function(i,n){
				if(n.id=="Benable_fz" || n.id=="BUseGeneral_fz"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
			});
			this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataSaveFZ",bzxs.BtnSavHandle,false);
		}else if(bzxs.focusSta == 2){
			$("#VNum,#VName,#VCODE10,#Benable,#NDistribution,#VRemarks").each(function(i,n){
				if(n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
			});
			this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataSave",bzxs.BtnSavHandle,false);
		}
		
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				bzxs.BtnCan();
//				if(bzxs.focusSta == 1){
					bzxs.LoadDataFZ();
//				}else if(bzxs.focusSta == 2){
//					bzxs.LoadData();
//				}
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		bzxs.sta = 0;
		bzxs.BtnChange(1);
		bzxs.inputDis(true);
		if(bzxs.focusSta == 1){ //病种分组
			if(bzxs.FZdataCount != 0 && bzxs.FZdataCount >= bzxs.FZselectRowIndex){
				bzxs.FZgrid_onSelectRow(bzxs.FZrowData,bzxs.FZstatus);
			}
		}else if(bzxs.focusSta == 2){
			if(bzxs.dataCount != 0 && bzxs.dataCount >= bzxs.selectRowIndex){
				bzxs.grid_onSelectRow(bzxs.rowData,bzxs.status);
			}
		}
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//导入更新、新增、修改可用，保存、放弃不可用
			$("#import,#add,#mod").each(function(i,n){
				bzxs.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				bzxs.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,导入更新、新增、修改不可用
			$("#sav,#can").each(function(i,n){
				bzxs.BtnDisabled(false,n.id);
		    });
			$("#import,#add,#addBZ,#mod").each(function(i,n){
				bzxs.BtnDisabled(true,n.id);
		    });
		}else if(type == 3){//导入更新、新增可用，修改、保存、放弃不可用
			$("#import,#add").each(function(i,n){
				bzxs.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				bzxs.BtnDisabled(true,n.id);
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
		bzxs.conditionDis();
		$("#Benable,#NDistribution,#VRemarks,#VName_fz,#Benable_fz,#NGeneral_fz,#BUseGeneral_fz").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
		});
		if(bzxs.focusSta == 1){//分组
			if(bzxs.sta == 1){ //新增
				$("#VNum_fz,#VName_fz,#NGeneral_fz").each(function(i,n){
					$("#"+n.id).val("");
				});
				$("#Benable_fz,#BUseGeneral_fz").each(function(i,n){
					$("#"+n.id+"1")[0].checked = true;
				});
				$("#NGeneral_fz").val("0.00");
				$("#VName_fz").focus();
			}else{
				$("#NGeneral_fz").focus();
			}
		}else if(bzxs.focusSta == 2){ // 疾病
			$("#NDistribution").focus();
			if(bzxs.sta == 1){
				$("#NDistribution").each(function(i,n){
						$("#"+n.id).val("0.00");
				});
			}
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(bzxs.sta == 0){
			$("#valueqry,#bitqry,#Qry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			bzxs.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			bzxs.BtnDisabled(true,"Qry");
		}
	}
});
var bzxs = new BZXSWH();