var activeDetailUrl = "http://172.16.0.178:8999/RosterUI";
//params
var activeDetailParams = {
	"name":"policy22",
	"curPage":"1",
	"pageNum":"12"
}
//data
var activeDetailData = {
		"method":"queryActivityDetail",
		"object":"QueryCondition",
		"type":"request",
		"params":activeDetailParams
};
//data json转换成字符串
var activeDetailResult = JSON.stringify(activeDetailData);
//每个活动的模板
var activeDetailHtmlTemp = function(activeName){
	//<div id='activeDetail_temp' class='row-fluid margin-bottom-40'>
	var activeDetailTemp = 
		"<div class='span3 pricing hover-effect'>"+
		"<div class='pricing-head'>"+
			"<h3>"+
				"<p id='activeDetail_activeName_"+activeName+"'></p>"+ 
				"<span id='activeDetail_activeType_"+activeName+"'></span>"+
			"</h3>"+
			"<h4><i id='activeDetail_activeState_"+activeName+"'></i></h4>"+ 
		"</div>"+
		"<ul class='pricing-content unstyled'>"+
			"<li><i class='icon-tags'></i> 联系名单表:"+
				"<span id='activeDetail_listName_"+activeName+"'></span></li>"+
			"<li><i class='icon-asterisk'></i>活动开始时间:"+
				"<span id='activeDetail_startTime_"+activeName+"'></span></li>"+
			"<li><i class='icon-heart'></i>活动结束时间:"+
				"<span id='activeDetail_endTime_"+activeName+"'></span></li>"+
			"<li><i class='icon-star'></i>已呼出名单数:"+
				"<span id='activeDetail_calledList_"+activeName+"'></span></li>"+
			"<li><i class='icon-shopping-cart'></i> 未呼出名单数:"+
				"<span id='activeDetail_nocallList_"+activeName+"'></span></li>"+
			"<li><i class='icon-shopping-cart'></i> DNC名单数:"+
				"<span id='activeDetail_dncList_"+activeName+"'></span></li>"+
			"<li><i class='icon-shopping-cart'></i> 坐席应答数:"+
				"<span id='activeDetail_agentAnswer_"+activeName+"'></span></li>"+
			"<li><i class='icon-shopping-cart'></i> 接通率:"+
				"<span id='activeDetail_completRate_"+activeName+"'></span></li>"+
		"</ul>"+
		"<div class='pricing-footer'>"+
			"<a id='activeDetail_detailClick_"+activeName+"' href='#' class='btn green'>"+
				"查看详情 <i class='m-icon-swapright m-icon-white'></i>"+
			"</a>"+  
		"</div>"+
	"</div>";
	return activeDetailTemp;
}

var activeDetailDisplayData = [];
var activeDetail_resultTemp = "";
var activeDetail_dataCount = 0;
//加载数据
var activeDetailLoadData = function(){
	
	$.ajax({
		type:"post",
		url:activeDetailUrl,
		async:true,
		data: activeDetailResult,
		dataType:"json",
        error: function (data) {
            console.info("error:");
            console.info(data);
        },
        success: function (data) {
        	activeDetailDisplayData = data.result.resList;
        	if(activeDetailDisplayData.length != activeDetail_dataCount){
        		activeDetail_dataCount = activeDetailDisplayData.length;
        		$("#activeDetail_content").empty();
        		activeDetail_resultTemp = "";
        		activeDetail_resultTemp ="<div class='row-fluid margin-bottom-40'>";
	        	for(var i=0;i<activeDetail_dataCount;i++){
	        		activeDetail_resultTemp += activeDetailHtmlTemp(activeDetailDisplayData[i].name);
	        		if(i%4 == 0 && i != 0){
	        			//console.info(i);
	        			activeDetail_resultTemp += 
	        			"</div><div class='row-fluid margin-bottom-40'>"+
	        			activeDetailHtmlTemp(activeDetailDisplayData[i].name);
	        		}
	        	}
	        	activeDetail_resultTemp += "</div>";
	        	$("#activeDetail_content").append(activeDetail_resultTemp);
        	}
        	if(activeDetail_dataCount!=0){
        		for(var j=0;j<activeDetail_dataCount;j++){
        			$("#activeDetail_activeName_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].name);
        			if(activeDetailDisplayData[j].type == "auto"){
        				$("#activeDetail_activeType_"+activeDetailDisplayData[j].name).html("自动");
        			}else if(activeDetailDisplayData[j].type == "yuce"){
        				$("#activeDetail_activeType_"+activeDetailDisplayData[j].name).html("预测");
        			}else{
        				$("#activeDetail_activeType_"+activeDetailDisplayData[j].name).html("未知类型");
        			}
        			if(activeDetailDisplayData[j].state == "complete"){
        				$("#activeDetail_activeState_"+activeDetailDisplayData[j].name).html("已完成");
        			}else if(activeDetailDisplayData[j].state == "running"){
        				$("#activeDetail_activeState_"+activeDetailDisplayData[j].name).html("运行中");
        			}else if(activeDetailDisplayData[j].state == "init"){
        				$("#activeDetail_activeState_"+activeDetailDisplayData[j].name).html("未开始");
        			}else if(activeDetailDisplayData[j].state == "pause"){
        				$("#activeDetail_activeState_"+activeDetailDisplayData[j].name).html("暂停");
        			}else{
        				$("#activeDetail_activeState_"+activeDetailDisplayData[j].name).html("未知状态");
        			}
        			$("#activeDetail_listName_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].rosterName);
        			$("#activeDetail_startTime_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].firstStartTime);
        			$("#activeDetail_endTime_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].lastEndTime);
        			$("#activeDetail_calledList_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].dialNum);
        			$("#activeDetail_nocallList_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].notDailNum);
        			$("#activeDetail_dncList_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].dncNum);
        			$("#activeDetail_agentAnswer_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].estabNum);
        			$("#activeDetail_completRate_"+activeDetailDisplayData[j].name).html(activeDetailDisplayData[j].connectorRate+"%");
        		}
        	}
        	
        }
	});
}
$(function(){
	activeDetailLoadData();
	setInterval(function(){
        activeDetailLoadData();
    }, 3000);
});