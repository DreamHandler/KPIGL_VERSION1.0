var BZXSWH = Class.create();
BZXSWH.prototype = Object.extend(new LBase(), {
	grid : null,
	initLoad : function(){
		bzwh.initCss();
		bzwh.createGrid();
		bzwh.LoadData();
	},
	initCss : function(){
		$(".con").width(bwidth);
		$(".con").height(bheight);
		
		$(".TopGrid").width(bwidth);
		$(".TopGrid").height(bheight-150-50);
		$(".fillter").width(bwidth-30);
		$(".GridDiv").width(bwidth-30);
		$(".GridDiv").height(bheight-150-50-50-30);
		$(".SetCenter").width(bwidth);
		$(".SetCenter").height(150);
		$(".formDiv").width(bwidth/3);
		$(".formRight").width(bwidth/3-120);
		$(".BtnFoot").width(bwidth);
		$(".BtnFoot").height(50);
		
		$("#FilValue").attr("disabled",true);
		$("#FilBit1").attr("disabled",true);
		$("#FilBit0").attr("disabled",true);
		
		bzwh.BtnChange(true,"mod");
		bzwh.BtnChange(true,"sav");
		bzwh.BtnChange(true,"can");
	},
	createGrid : function(){
		bzwh.grid = $("#GridDiv").LyGrid({ 
            columns: [
            { display: '病种编码', name: 'VBZBM', width: 150, type: 'int' },
            { display: '病种名称', name: 'VBZMC', width: bwidth-30-670 },
            { display: '拼音码', name: 'VPYM', width: 300 },
            { display: '是否可用', name: 'BENABLE', width: 100 },
            { display: '系数', name: 'NXS', width: 120 }
            ], width: bwidth-30, pkName: 'id', pageSizeOptions: [5, 10, 15, 20], height: bheight-150-50-50-30-1
        });
	},
	LoadData : function(){
		var QryJson = {};
		if($("#valueqry").get(0).checked==true){
			QryJson["ValQry"] = $("#FilValue").val();
		}
		if($("#bitqry").get(0).checked==true){
			QryJson["BENABLE"] = $("input[name='FilBit']:checked").val();
		}
		this.ajaxCall(QryJson,"KPIGL.XTWH.BZXSWH","DataQry",bzwh.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = bzwh.StrToXml(response.responseText);
			}
//			alert(node.xml);
		}
	},
	SetGridData : function(node){
		var jsonObj = {};
		var Djson = GridXmlToJson.Change(node);
        jsonObj.Rows = Djson;
        bzwh.grid.set({ data: jsonObj }); 
	},
	BtnChange : function(flag,Uid){
		if(flag){
			$("#"+Uid).attr("disabled",true);
			$("#"+Uid).css("background-image","url('source/images/button_dis.png')");
		}else{
			$("#"+Uid).attr("disabled",true);
			$("#"+Uid).css("background-image","url('source/images/button.png')");
		}
	},
	BtnMove : function(stat,obj){
		if(stat==1){
			$(obj).css("background-image","url('source/images/button_over.png')");
		}else{
			$(obj).css("background-image","url('source/images/button.png')");
		}
	}
});
var bzwh = new BZXSWH();