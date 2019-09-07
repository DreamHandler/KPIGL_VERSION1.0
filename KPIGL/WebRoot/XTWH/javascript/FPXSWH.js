var FPXSWH = Class.create();
FPXSWH.prototype = Object.extend(new LBase(), {
	grid : null,
	sta : 0, //0-取消；1-新增；2-修改
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	status : "", 
	dataCount : 0,
	initLoad : function(){
		fpxs.initCss();
		fpxs.inputDis(true);
		fpxs.createGrid();
		fpxs.LoadData();
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
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
		
		fpxs.BtnChange(3);
	},
	createGrid : function(){
		fpxs.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '科室编码', name: 'VNum', width: 80, type: 'int' },
            { display: '科室名称', name: 'VName', width: 200 },
            { display: '拼音码', name: 'VPYM', width: 150 },
            { display: '归属科室名称', name: 'VManagement', width: 180 },
            { display: '分配系统', name: 'NDistribution', width: 80 },
            { display: '可用性', name: 'Benable', width: 80 ,render : fpxs.toBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum',
            pageSize:15,
            pageSizeOptions: [10, 15, 20, 25], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : fpxs.grid_onSelectRow,
            onBeforeSelectRow : fpxs.grid_disabled
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
		fpxs.status = status;
		fpxs.rowData = rowData;
		fpxs.selectRowIndex = rowData["__index"];
		$("#VNum,#VName,#VManagement,#NDistribution,#Benable").each(function(i,n){
				if(n.id=="Benable"){
					$("#"+n.id+rowData[n.id])[0].checked = true;
				}else{
					$("#"+n.id).val(rowData[n.id]);
				}
		});
		fpxs.BtnChange(1);
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(fpxs.sta == 1){
			alert("请先保存或者取消对分配系数的操作！")
			$("#VName").focus();
			return false;
		}else if(fpxs.sta == 2){
			alert("请先保存或者取消对分配系数的操作！")
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
		this.ajaxCall(QryJson,"KPIGL.XTWH.FPXSWH","DataQry",fpxs.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = fpxs.StrToXml(response.responseText);
			}
			fpxs.SetGridData(node);
			if(fpxs.dataCount != 0){
				if(fpxs.dataCount < fpxs.selectRowIndex+1){
					fpxs.selectRowIndex = 0;
				}
				fpxs.grid.select(fpxs.selectRowIndex);
			}
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        fpxs.dataCount = Djson.length;
        fpxs.grid.set({ data: jsonObj }); 
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
				fpxs.ajaxCall({},"KPIGL.XTWH.FPXSWH","DataImport",fpxs.importHander,false);
			}
		});
	},
	importHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = fpxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text>="1"){
				alert("导入更新成功！");
				fpxs.LoadData();
			}else{
				alert("导入更新失败！");
			}
		}
	},
	BtnAdd : function(){
		fpxs.sta = 1;
		fpxs.BtnChange(2);
		fpxs.inputDis(false);
		this.ajaxCall({},"KPIGL.XTWH.FPXSWH","GetVNum",fpxs.GetVNumHander,false);
	},
	GetVNumHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = fpxs.StrToXml(response.responseText);
			}
			var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
			$("#VNum").val(FieldsValue[0].getAttribute("maxVNum"))
			//将其他赋默认值
			$("#VName,#Benable").each(function(i,n){
				if(n.id == "Benable"){
					$("#"+n.id+"1")[0].checked = true;
				}else{
					$("#"+n.id).val("");
				}
			})
			$("#VName").focus();
		}
	},
	BtnMod : function(){
		fpxs.sta = 2;
		fpxs.BtnChange(2);
		fpxs.inputDis(false);
	},
	BtnSav : function(){
		var QryJson = {"flag":fpxs.sta};
		$("#VNum,#VName,#VManagement,#NDistribution,#Benable").each(function(i,n){
				if(n.id=="Benable"){
					var value = $('input:radio[name="'+n.id+'"]:checked').val();
					QryJson[n.id] = value;
				}else{
					QryJson[n.id] = $("#"+n.id).val();
				}
		});
		this.ajaxCall(QryJson,"KPIGL.XTWH.FPXSWH","DataSave",fpxs.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = fpxs.StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				fpxs.BtnCan();
				fpxs.LoadData();
			}else{
				alert("保存失败！");
			}
		}
	},
	BtnCan : function(){
		fpxs.sta = 0;
		fpxs.inputDis(true);
		fpxs.BtnChange(3);
		if(fpxs.dataCount != 0 && fpxs.dataCount >= fpxs.selectRowIndex){
			fpxs.grid_onSelectRow(fpxs.rowData,fpxs.status);
		}
	},
	/**
	 * 按钮显隐控制
	 */
	BtnChange : function(type){
		if(type == 1){//导入、新增、修改可用，保存、放弃不可用
			$("#import,#add,#mod").each(function(i,n){
				fpxs.BtnDisabled(false,n.id);
		    });
			$("#sav,#can").each(function(i,n){
				fpxs.BtnDisabled(true,n.id);
		    });
		}else if(type == 2){//保存、放弃可用,导入、新增、修改不可用
			$("#sav,#can").each(function(i,n){
				fpxs.BtnDisabled(false,n.id);
		    });
			$("#import,#add,#mod").each(function(i,n){
				fpxs.BtnDisabled(true,n.id);
		    });
		}if(type == 3){//导入、新增可用，修改、保存、放弃不可用
			$("#import,#add").each(function(i,n){
				fpxs.BtnDisabled(false,n.id);
		    });
			$("#mod,#sav,#can").each(function(i,n){
				fpxs.BtnDisabled(true,n.id);
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
		fpxs.conditionDis();
		if(fpxs.sta == 1 || fpxs.sta == 0){//新增、取消
			$("#VName,#VManagement,#NDistribution,#Benable").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
			});
			if(fpxs.sta == 1){
				$("#VName").each(function(i,n){
					$("#"+n.id).val("");
				});
				$("#NDistribution").each(function(i,n){
					$("#"+n.id).val("0.00");
				});
			}
			$("#VName").focus();
		}else if(fpxs.sta == 2){//修改
			$("#NDistribution,#Benable").each(function(i,n){
				$("#"+n.id).attr("disabled",inputflag);
			});
			$("#NDistribution").select();
		}
	},
	/**
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		if(fpxs.sta == 0){
			$("#valueqry,#bitqry").each(function(i,n){
				$("#"+n.id)[0].disabled = false;
				if(n.id == "valueqry"){
					$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
				}else if(n.id == "bitqry"){
					$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
				}
			});
			fpxs.BtnDisabled(false,"Qry");
		}else{
			$("#valueqry,#FilValue,#bitqry,#FilBit").each(function(i,n){
				$("#"+n.id)[0].disabled = true;
			});
			fpxs.BtnDisabled(true,"Qry");
		}
	},
	getEpBox : function(aThis,ep){//科室
		getEpBox(aThis,{epName:ep,epJson:[{id:'VManagement',value:1},{id:'VManagementNum',value:0}]});
//		getMoreEpBox(aThis,{epName:'TBKS',epValue:'VName',epValue2:'VNum',width:400,PYMFilter:true});
	}
});
var fpxs = new FPXSWH();