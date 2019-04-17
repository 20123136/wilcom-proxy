function initTable($table) {

	$table.bootstrapTable({
		//url:'../../data/unlock/unlockFlow.json',//请求后台的URL
		url:'/POCReportAdmin/unlockFlowServlet',
		method: 'get',//请求方式
		striped:true,//是否显示行间隔色
		cache: false,//是否使用缓存，默认为true
		toolbar:'#toolbar',
//		searchAlign:'left',
//		buttonsAlign:'left',
		//toolbarAlign:'right',
		pagination: true,//是否显示分页
		pageSize: 10,//每行的记录行数
		pageNumber:1,//初始化加载第一页，默认第一页
		pageList: [10, 20, 50, 100, 200, 500],//可供选择的每页的行数
		search: true,//是否显示表格搜索
		shortable:true,//是否启用排序
		sortName:'createTime',
		shortOrder:'asc',//排序方式
		showColumns: true,//是否显示所有的列
		showRefresh: true,//是否显示刷新按钮
		showToggle:false,//是否显示详细视图和列表视图
		cardView:false,//是否显示详细视图
//		detailView:true,//是否显示父子表
		showExport: true,//是否显示导出
		exportTypes: ['csv','txt','excel'],
		exportDataType:'all', //basic,all,selected
		//height: 500,//行高
		responseHandler:responseHandler,
		groupBy:true,
		groupByField:'rec_date',
		
//		toggle:"unlockFlowTable",
		//advancedSearch:true,
		//idTable:"advancedTable",
		
		//因报表不需要增删改，所以不需要下列复杂的属性
//		sidePagination:'server',//分页方式：client客户端分页
//		minimumCountColumns:2,//最少允许的列数
//		toolbar:'#toolbar',//工具按钮用哪个容器
//		uniqueId:'id',//每一行的唯一标识，一般为主键
//		clickToSelect: true,//是否启用点击选中行
		queryParams:queryParams,//传递参数
		//strictSearch:true,
		
		columns: [
			{field:"userName",title:"姓名",align:"center",valign:"middle",sortable:"true"},
			{field:"cardNo",title:"卡号",align:"center",valign:"middle",sortable:"true"},
			{field:"phoneNo",title:"手机号码",align:"center",valign:"middle",sortable:"true"},
			{field:"gender",title:"性别",align:"center",valign:"middle",sortable:"true"},
			{field:"cardType",title:"卡类别",align:"center",valign:"middle",sortable:"true"},
			{field:"isUnLock",title:"密码是否解锁",align:"center",valign:"middle",sortable:"true"},
			{field:"unlockFailReason",title:"密码解锁失败原因",align:"center",valign:"middle",sortable:"true"},
			{field:"isUpdatePwd",title:"交易密码是否更新",align:"center",valign:"middle",sortable:"true"},
			{field:"newPwd",title:"新交易密码",align:"center",valign:"middle",sortable:"true"},
			{field:"isCardControl",title:"信用卡是否管制",align:"center",valign:"middle",sortable:"true"},
			{field:"createTime",title:"创建时间",align:"center",valign:"middle",sortable:"true"}
		],
		onPageChange: function (size, number) {
			//$("#pageSizeInput").val(size);
			//$("#pageNumberInput").val(number);
			
			//var form = $('#tableForm');
			//form.action= '${base}/showReport';
			//form.submit();
        },
		//onSort: function (name, order) {
        //},
		//formatShowingRows: function (pageFrom, pageTo, totalRows) {
		//	return '';
        //},
		//formatRecordsPerPage: function () {
		//	return '';
        //},
        onLoadSuccess: function(data){  //加载成功时执行  
          //layer.msg("加载成功"); 
          console.info("加载成功");
        },  
        onLoadError: function(data){  //加载失败时执行  
          //layer.msg("加载数据失败", {time : 1500, icon : 2}); 
          console.info("加载失败");
        },  
        formatNoMatches: function(){
        	return '无符合条件的记录';
        }
	});
	
	$(window).resize(function () {
		$table.bootstrapTable('resetView');
	});
	
	return $table;
}	

	function responseHandler(res) {
        return res;
    }
	//拨打次数排序
//	function timeSorter(a, b) {
//		console.info(a);
//		console.info(b);
//      a = +a.substring(1); // remove $
//      b = +b.substring(1);
//      if (a > b) return 1;
//      if (a < b) return -1;
//      return 0;
//  }

	//参数
	function queryParams() {
        var params = {};
        $('#searchTools').find('input[name]').each(function () {
        	console.info($(this).attr('name'));
            params[$(this).attr('name')] = $(this).val();
        });
        console.info(params);
        return params;
    }

	//获取当前日期
	function getToday() {
		var doday = new Date();
		var year = doday.getFullYear();
		var month = doday.getMonth()+1;
		if(month < 10){
			month = "0"+month;
		}
		var d = doday.getDate();
		if(d < 10){
			d = "0"+d;
		}
		var todate = "";
		todate = year+"-"+month+"-"+d;
		
		return todate;
    }
	
	//初始化搜索时间
	function initDateTime(){
	    $('#beginTime').val(getToday()+" 00:00:00");
	    $('#endTime').val(getToday()+" 23:59:59");
	}

$(function(){
	var $table = $('#unlockFlowTable');
	initTable($table);
	var search = $('#search');
	
	$('#toolbar').find('select').change(function () {
        $table.bootstrapTable('refreshOptions',{
            groupByField: $(this).val()
        });
    });
    
    //时间控件的初始化
	$(".form_datetime").datetimepicker({
	    format: "yyyy-mm-dd hh:ii:ss",
	    language: "zh",
	    todayBtn: true,
	    pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
	});
    
    //初始化搜索时间
    initDateTime();
    
    search.click(function () {  	
        $table.bootstrapTable('refresh');
    });
});
