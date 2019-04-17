var activeTotalUrl = "http://172.16.0.178:8999/RosterUI";
var activeTotalParams = {
	"name":"policy22",
	"curPage":"1",
	"pageNum":"12"
}
var activeTotalData = {
		"method":"queryActivityStatus",
		"object":"QueryCondition",
		"type":"request",
		"params":activeTotalParams
};
var activeTotalResult = "";
var activeTotalDisplayData=[];
var activeTotalLoadData = function(){
	activeTotalResult= JSON.stringify(activeTotalData);
	$.ajax({
		type:"post",
		url:activeTotalUrl,
		async:true,
		data: activeTotalResult,
		dataType:"json",
        error: function (data) {
            console.info("error:");
            console.info(data);
        },
        success: function (data) {
			//init 初始化	running正在运行	pause 暂停	
			//complete 完成	total 要运行的个数
        	activeTotalDisplayData = data.result.resList;
        	for(var i=0;i<activeTotalDisplayData.length;i++){
        		$(".acriveRunning").html(activeTotalDisplayData[i].running);
        		$(".activeComplete").html(activeTotalDisplayData[i].complete);
        		$(".activePause").html(activeTotalDisplayData[i].pause);
        		$(".activeTotal").html(activeTotalDisplayData[i].total);
        	}
        }
	});
}
$(function(){
	activeTotalLoadData();
	setInterval(function(){
        activeTotalLoadData();
    }, 3000);
});