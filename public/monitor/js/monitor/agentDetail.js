//var url = "http://192.168.60.203:8083/action";
var agentDetailUrl = "http://172.16.0.195:8083/action";
var agentDetailDomain = "wilcom.cn";
var agentDetailDevice = "";

var getAgentDetailParams = function(skill){
	agentDetailDevice = skill;
	var agentDetailData = {
		domain:agentDetailDomain,
		device:agentDetailDevice
	};
	agentDetailData = JSON.stringify(agentDetailData);
	
	var agentDetailParams = {
		"action":"getAgentMetric",
		"data":agentDetailData,
		"sessionId":"s95E2B128A732674E6EDE16648E2862C5-7",
		"action_id":Math.random()
	};
	//data 
	return agentDetailParams;
}

//技能组相关参数
var agentDetail_skillUrl = "http://172.16.0.195:8083/action";
var agentDetail_skillDomain = "wilcom.cn";
var agentDetail_skillData = {
	domain:agentDetail_skillDomain
};
agentDetail_skillData = JSON.stringify(agentDetail_skillData);
var agentDetail_skillParams = {
	"action":"getSkillMetric",
	"data":agentDetail_skillData,
	"sessionId":"s95E2B128A732674E6EDE16648E2862C5-7",
	"action_id":Math.random()
};

//获取技能组列表模板
var agentDetailMenuTemp = function(skill){
	var temp =
	"<li id='tabli_"+skill+"'><a data-toggle='tab' "+
	"onclick = 'agentDetailLoadData("+skill+")' href='#tab_"+skill+"'>"+
	"<i class='icon-cog'></i>"+skill+"</a>" +
	"<span class='after'></span></li>";
	
	return temp;
}

//获取坐席明细列表模板
var agentDetailAgentListTemp = function(AgentId){
	var temp =
	"<div style='height: auto;' id='accordion"+AgentId+"' class='accordion collapse'>"+
	"<div class='row-fluid portfolio-block'>"+
	"<div class='span2 portfolio-btn'>"+
	"<a href='#' class='btn bigicn-only'><span>"+AgentId+"</span></a>"+                      
	"</div><div class='span10'>"+
//	"<div class='portfolio-info'>坐席工号"+
//	"<span id='agentDetail_agentNo_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>坐席姓名"+
	"<span id='agentDetail_agentName_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>座席状态"+
	"<span id='agentDetail_agentState_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>状态时长"+
	"<span id='agentDetail_agentStateLength_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>当前来电号码"+
	"<span id='agentDetail_ano_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>活动名称"+
	"<span id='agentDetail_activeName_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>累计通话数"+
	"<span id='agentDetail_callNum_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>累计通话时长"+
	"<span id='agentDetail_calltime_"+AgentId+"'></span></div>"+
	"<div class='portfolio-info'>平均通话时长"+
	"<span id='agentDetail_avgCallLength_"+AgentId+"'></span>"+
	"</div></div></div></div>";
	
	return temp;
}

//获取技能组列表
var agentDetail_resultMenuTemp = "";
var getskillDisplayDataCount = 0;
var getskillDisplayFlagCount = 0;
var getskillDisplayData = [];
var getSkillMenuTemp = function(){
	$.ajax({
		type:"post",
		url:agentDetail_skillUrl,
		async:true,
		data: agentDetail_skillParams,
		dataType:"json",
        error: function (data) {
            console.info("skill.error:");
            console.info(data);
        },
        success: function (data) {
        	getskillDisplayData = data.serviceMetricsResponseMap;
        	for(var x in getskillDisplayData){
				getskillDisplayFlagCount++;
			}
			if(getskillDisplayDataCount!=getskillDisplayFlagCount){
				getskillDisplayDataCount = getskillDisplayFlagCount;
				getskillDisplayFlagCount=0;
				$("#agentDetail_skillMenu").empty();
				agentDetail_resultMenuTemp = "";
				var c = 0;
				for(var k in getskillDisplayData){
					c++;
					if(c==1){
						agentDetailDevice = getskillDisplayData[k].attributes[1].split('.')[1];
					}
					var agentDetail_skill = getskillDisplayData[k].attributes[1].split('.')[1];
					agentDetail_resultMenuTemp += agentDetailMenuTemp(agentDetail_skill);
				}
				$("#agentDetail_skillMenu").append(agentDetail_resultMenuTemp);
				$("#tabli_"+agentDetailDevice).addClass("active");
			}
			getskillDisplayFlagCount=0;
        }
	});
	
	
}

var agentDetailDisplayData = [];
var agentDetail_resultListTemp = "";
var agentDetail_dataCount = 0;
var agentDetail_flagCount = 0;
var agentDetailLoadData = function(skill){
	agentDetailDevice = skill;
	$.ajax({
		type:"post",
		url:agentDetailUrl,
		async:true,
		data: getAgentDetailParams(agentDetailDevice),
		dataType:"json",
        error: function (data) {
            console.info("agentDetail.error:");
            console.info(data);
        },
        success: function (data) {
    	agentDetailDisplayData = data.serviceMetricsResponseMap;
    	for(var y in agentDetailDisplayData){
    		agentDetail_flagCount++;
    	}
	    if(agentDetail_dataCount!=agentDetail_flagCount){
	    	agentDetail_dataCount = agentDetail_flagCount;
	    	agentDetail_flagCount = 0;
			$("#agentDetail_agentList").empty();
			agentDetail_resultListTemp = "";
			agentDetail_resultListTemp = "<div id='tab_"+agentDetailDevice+"' class='tab-pane active'>";
			for(var i in agentDetailDisplayData){
				agentDetail_resultListTemp += agentDetailAgentListTemp(agentDetailDisplayData[i].metrics.AgentId);
			}
			agentDetail_resultListTemp += "</div>";
			$("#agentDetail_agentList").append(agentDetail_resultListTemp);
        }
	    agentDetail_flagCount = 0;
		for(var j in agentDetailDisplayData){
			var agentDetail_AgentID = agentDetailDisplayData[j].metrics.AgentId;
			if(agentDetailDisplayData[j].metrics.AgentName==null){
				$("#agentDetail_agentName_"+agentDetail_AgentID).html("");
			}else{
				$("#agentDetail_agentName_"+agentDetail_AgentID).html(agentDetailDisplayData[j].metrics.AgentName);
			}
    		if(agentDetailDisplayData[j].metrics.AgentState == "ResourceEnable"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("空闲");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceReady"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("就绪");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceNotReady"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("未就绪");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceDisable"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("未登录");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceRingback"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("回铃中");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceRing"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("振铃中");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceAux"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("离席");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceAtWork"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("通话中");
    		}else if(agentDetailDisplayData[j].metrics.AgentState == "ResourceWrapUp"){
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("话后处理");
    		}else{
    			$("#agentDetail_agentState_"+agentDetail_AgentID).html("");
    		}
			$("#agentDetail_agentStateLength_"+agentDetail_AgentID).html(formatSeconds(agentDetailDisplayData[j].metrics.LastTime));
    		$("#agentDetail_ano_"+agentDetail_AgentID).html(agentDetailDisplayData[j].metrics.CallNum);
    		$("#agentDetail_activeName_"+agentDetail_AgentID).html("暂无");
    		$("#agentDetail_callNum_"+agentDetail_AgentID).html(agentDetailDisplayData[j].metrics.ProcessCount);
    		$("#agentDetail_calltime_"+agentDetail_AgentID).html(agentDetailDisplayData[j].metrics.callInAnswerTime);
    		var callInAnswerTime = parseInt(agentDetailDisplayData[j].metrics.callInAnswerTime);
    		var procssCount = parseInt(agentDetailDisplayData[j].metrics.ProcessCount);
    		$("#agentDetail_avgCallLength_"+agentDetail_AgentID).html(
    			agent_division(callInAnswerTime,procssCount)
    		);
    	}
        }
	});
}
$(function(){
	getSkillMenuTemp();
	setInterval(function(){
        getSkillMenuTemp();
    }, 3000);
	agentDetailLoadData(agentDetailDevice);
	setInterval(function(){
        agentDetailLoadData(agentDetailDevice);
    }, 3000);
});

//除法运算
var agent_division = function(a,b){
    var c = 0.00;
    if(b != 0){
        c = (a/b).toFixed(2);
    }
    
    return c;
}

//时间戳转换成四位时间10:10:00
function userTime(uTime){
	var myDate = new Date(uTime*1000);
	var hours = myDate.getHours();
	var minutes = myDate.getMinutes();
	var second = myDate.getSeconds();
	return hours + ':' + minutes + ':' + second;
}

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
	        theTime2 = parseInt(theTime1/60);
	        theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(theTime1 > 0) {
    	result = ""+parseInt(theTime1)+"分"+result;
    }
    if(theTime2 > 0) {
    	result = ""+parseInt(theTime2)+"小时"+result;
    }
    return result;
}