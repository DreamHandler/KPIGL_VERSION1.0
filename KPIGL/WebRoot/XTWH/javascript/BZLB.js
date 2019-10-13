var BZLB = Class.create();
BZLB.prototype = Object.extend(new LBase(), {
	grid : null, // 病种grid
	selectRowIndex : 0,
	rowData : null, //grid聚焦数据
	checkedBZ : [], // 选中的病种
	initLoad : function(){
		bzlb.initCss();
		bzlb.conditionDis();
		bzlb.createGrid();
		bzlb.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".TopGrid").width($(".con").width());
		$(".TopGrid").height($(".con").height()-$(".SetCenter").height()-50);
		$(".fillter,.GridDiv,.SetCenter").width($(".TopGrid").width()-30);
		$(".GridDiv").height($(".TopGrid").height()-$(".fillter").height()-30);
		$(".BtnFoot").width($(".con").width());
		$(".BtnFoot").height(50);
	},
	createGrid : function(){
		bzlb.grid = $("#GridDiv").LyGrid({ 
			checkbox: true,
            columns: [
            { display: '病种编码', name: 'VNum', width: 80, type: 'int' },
			{ display: '病种名称', name: 'VName', width: 160 },
			{ display: '拼音码', name: 'VPYM', width: 160 },
			{ display: 'CODE10', name: 'VCODE10', width: 80 },
			{ display: '分配系数', name: 'NDistribution', width: 110 },
			{ display: '可用性', name: 'Benable', width: 60 ,render : bzlb.toBenable}
            ], width: $(".GridDiv").width(), pkName: 'VNum',
            pageSize:10,
            pageSizeOptions: [10, 15, 20, 25], 
            height: $(".GridDiv").height()-1,
            //grid 点击事件
            onSelectRow : bzlb.grid_onSelectRow,
            isChecked: bzlb.f_isChecked,
            onCheckRow: bzlb.f_onCheckRow, 
            onCheckAllRow: bzlb.f_onCheckAllRow
        });
	},
	/**
	 * GRID数据格式化
	 */
	toBenable : function(value,col){
		return value.Benable == "1"? "可用":"不可用";
	},
	grid_onSelectRow : function(rowData,status){
		
	},
	/**
	 * 根据选择状态，进行数据添加和移除
	 */
	f_onCheckAllRow : function(checked){
        for (var rowid in this.records){
            if(checked)
            	bzlb.addCheckedBZ(this.records[rowid]['VNum']);
            else
            	bzlb.removeCheckedBZ(this.records[rowid]['VNum']);
        }
    },
	 /**
	    该例子实现 表单分页多选
	    即利用onCheckRow将选中的行记忆下来，并利用isChecked将记忆下来的行初始化选中
    */
    findCheckedBZ : function (VNum){
        for(var i =0;i<bzlb.checkedBZ.length;i++){
            if(bzlb.checkedBZ[i] == VNum) return i;
        }
        return -1;
    },
    addCheckedBZ : function (VNum){
        if(bzlb.findCheckedBZ(VNum) == -1)
        	bzlb.checkedBZ.push(VNum);
    },
    removeCheckedBZ : function (VNum){
        var i = bzlb.findCheckedBZ(VNum);
        if(i==-1) return;
        bzlb.checkedBZ.splice(i,1);
    },
    f_isChecked : function(rowdata){
    	if(rowdata.VGroupNum == VGroupNum){
    		bzlb.checkedBZ.push(rowdata.VNum);
    	}
        if (bzlb.findCheckedBZ(rowdata.VNum) == -1)
            return false;
        return true;
    },
    f_onCheckRow : function (checked, data){
        if (checked) bzlb.addCheckedBZ(data.VNum);
        else bzlb.removeCheckedBZ(data.VNum);
    },
	/**
	 * 查询病种
	 */
	LoadData : function(){
		var QryJson = {};
		if($("#valueqry").get(0).checked==true){
			QryJson["ValQry"] = $("#FilValue").val();
		}
		if($("#bitqry").get(0).checked==true){
			QryJson["BENABLE"] = $("input[name='FilBit']:checked").val();
		}
		QryJson["VGroupNum"] = VGroupNum;
		this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","QryWFZData",bzlb.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzlb.StrToXml(response.responseText);
			}
			bzlb.SetGridData(node);
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
		jsonObj.Rows = Djson;
        bzlb.dataCount = Djson.length;
        bzlb.grid.set({ data: jsonObj }); 
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
	BtnSav : function(){
		var QryJson = {"flag":"1"};
		var VNums = bzlb.checkedBZ.join(',');
		QryJson["VNums"] = VNums;
		QryJson["VGroupNum"] = VGroupNum;
		QryJson["NGeneral"] = NGeneral;
		this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataSave",bzlb.BtnSavHandle,false);
	},
	BtnSavHandle : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzlb.StrToXml(response.responseText);
			}
			parent.bzxs.LoadDataFZ(); //调用父页面方法
			bzlb.BtnCan();
		}
	},
	BtnCan : function(){
		//刷新父页面
		dialog.close();//关闭dialog
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
	 * 查询条件显隐控制
	 */
	conditionDis : function(){
		$("#valueqry,#bitqry,#Qry").each(function(i,n){
			$("#"+n.id)[0].disabled = false;
			if(n.id == "valueqry"){
				$("#FilValue")[0].disabled = !$("#"+n.id)[0].checked;
			}else if(n.id == "bitqry"){
				$("#FilBit")[0].disabled = !$("#"+n.id)[0].checked;
			}
		});
		bzlb.BtnDisabled(false,"Qry");
	}
});
var bzlb = new BZLB();