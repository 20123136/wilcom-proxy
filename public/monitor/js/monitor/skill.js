//var url = "http://192.168.60.203:8083/action";
var skillUrl = "http://172.16.0.195:8083/action";
var skillDomain = "wilcom.cn";
var skillData = {
	domain:skillDomain
};
skillData = JSON.stringify(skillData);
var skillParams = {
		"action":"getSkillMetric",
		"data":skillData,
		"sessionId":"s95E2B128A732674E6EDE16648E2862C5-7",
		"action_id":Math.random()
};

var skillHtmlTemp = function(skillId){
	var temp = 
	"<div class='span3 pricing hover-effect'>"+
	"<div class='pricing-head'>"+
	"<h3><i id='skill_skillId_"+skillId+"'></i><span>技能组编号</span></h3>"+
	"<h4><i id='skill_loginagent_"+skillId+"'></i> <span>登录坐席数</span></h4>"+
	"<h4><i id='skill_leisureagent_"+skillId+"'></i> <span>空闲坐席数</span></h4></div>"+
	"<ul class='pricing-content unstyled'>"+
	"<li><i class='icon-tags'></i>排队数:"+
	"<span id='skill_queue_"+skillId+"'></span></li>"+
	"<li><i class='icon-asterisk'></i>应答数:"+
	"<span id='skill_answer_"+skillId+"'></span></li>"+
	"<li><i class='icon-heart'></i>放弃数:"+
	"<span id='skill_giveup_"+skillId+"'></span></li>"+
	"<li><i class='icon-star'></i>接通率:"+
	"<span id='skill_unlock_"+skillId+"'></span></li>"+
	"<li><i class='icon-bar-chart'></i>平均振铃时长:"+
	"<span id='skill_avgringtime_"+skillId+"'></span></li>"+
	"<li><i class='icon-bar-chart'></i>平均通话时长:"+
	"<span id='skill_avgcalltime_"+skillId+"'></span></li>"+
	"<li><i class='icon-bar-chart'></i>平均排队时长:"+
	"<span id='skill_avgqueuetime_"+skillId+"'></span></li></ul>"+
	"<div class='pricing-footer'>"+
	"<a id='skill_detailClick_"+skillId+"' href='#' class='btn green'>"+
	"查看详情 <i class='m-icon-swapright m-icon-white'></i>"+
	"</a></div></div>";
	
	return temp;
}

var skillResult = null;
var skillDisplayData = [];
var skillDisplayFlagCount = 0;
var skillDisplayCount = 0;
var skill_resultTemp = "";
var skillLoadData = function(){
	skillResult = skillParams;
	$.ajax({
		type:"post",
		url:skillUrl,
		async:true,
		data: skillResult,
		dataType:"json",
        error: function (data) {
            console.info("skill.error:");
            console.info(data);
        },
        success: function (data) {
        	skillDisplayData = data.serviceMetricsResponseMap;
        	//console.info(data);
        	for(var i in skillDisplayData){
        		skillDisplayFlagCount++;
        	}
        	if(skillDisplayFlagCount != skillDisplayCount){
        		skillDisplayCount = skillDisplayFlagCount;
        		skillDisplayFlagCount = 0;
        		$("#skill_content").empty();
        		skill_resultTemp = "";
        		skill_resultTemp ="<div class='row-fluid margin-bottom-40'>";
	        	for(var j in skillDisplayData){
	        		skill_resultTemp += skillHtmlTemp(skillDisplayData[j].attributes[1].split(".")[1]);
	        		if(j%4 == 0 && j != 0){
	        			skill_resultTemp += 
	        			"</div><div class='row-fluid margin-bottom-40'>"+
	        			skillHtmlTemp(skillDisplayData[j].attributes[1].split(".")[1]);
	        		}
	        	}
	        	skill_resultTemp += "</div>";
	        	$("#skill_content").append(skill_resultTemp);
        	}
        	skillDisplayFlagCount = 0;
    		for(var k in skillDisplayData){
    			var skillId = skillDisplayData[k].attributes[1].split(".")[1];
    			$("#skill_skillId_"+skillId).html(skillId);
    			$("#skill_loginagent_"+skillId).html(skillDisplayData[k].metrics.ResourceCount);
    			$("#skill_leisureagent_"+skillId).html(skillDisplayData[k].metrics.ResourceReadyCount);
    			$("#skill_queue_"+skillId).html(skillDisplayData[k].metrics.WaitingWorkCount);
    			$("#skill_answer_"+skillId).html(skillDisplayData[k].metrics.TotalCallInAnswer);
    			$("#skill_giveup_"+skillId).html(skillDisplayData[k].metrics.AbandonNum);
    			//acd呼入接听数
    			var callInTotalAnswer = parseInt(skillDisplayData[k].metrics.TotalCallInAnswer);
    			//总的ACD呼入数
    			var callInTotal = parseInt(skillDisplayData[k].metrics.TotalCallin);
    			$("#skill_unlock_"+skillId).html(skill_division(callInTotalAnswer,callInTotal)+"%");
    			//呼入振铃总时长
    			var callInRingTotalLength = parseInt(skillDisplayData[k].metrics.TotalCallInRingTime);
    			$("#skill_avgringtime_"+skillId).html(skill_division(callInRingTotalLength,callInTotal));
    			//总的呼入时长
    			var callInTotalLength = parseInt(skillDisplayData[k].metrics.TotalCallInTime);
    			$("#skill_avgcalltime_"+skillId).html(skill_division(callInTotalLength,callInTotal));
    			//总的排队时长
    			var queueTotalLength = parseInt(skillDisplayData[k].metrics.TotalQueueTime)
    			$("#skill_avgqueuetime_"+skillId).html(skill_division(queueTotalLength,callInTotal));
    		}
        }
	});
}
$(function(){
	skillLoadData();
	setInterval(function(){
        skillLoadData();
    }, 3000);
});
//除法运算
var skill_division = function(a,b){
    var c = 0.00;
    if(b != 0){
        c = (a/b).toFixed(2);
    }
    
    return c;
}