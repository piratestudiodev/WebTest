function checkInvalidChar(strInput)
{
	console.log("checkInvalidChar:start");
	console.log("strInput:", strInput);
	// 参数内组合用
	if (strInput.indexOf("\&") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“&”！");
		return false ;
	}
	// 所有参数拼接用
	if (strInput.indexOf("\@") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“@”！");
		return false ;
	}
	// 多个投票记录拼接用
	if (strInput.indexOf("\%") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“%”！");
		return false ;
	}
	console.log("checkInvalidChar:end");
}

function onVote(){

	console.log("onVote:start");
	// 获取投票人昵称
	var strVoteUserName = $('#strVoteUserName').val() ;
	console.log("strVoteUserName:", strVoteUserName);
	if ('' == strVoteUserName) 
	{
		notifyMsg("请填写投票人昵称");
		return false;
	}

	if (false == checkInvalidChar(strVoteUserName)) 
	{
		return false ;
	}

	// 获取html名称
	var StrRandChar = $('#StrRandChar').attr('name') ;
	console.log("StrRandChar:", StrRandChar);

	// 获取聚会时间选项
	var arrayPartyTimeName = new Array() ;
	var arrayPartyTimeCheck = new Array() ;
	var bHaveTimeCheck = 0;
	$('#partyTimeItems').find('.voteLab').each(function() {
		if ('' != $(this).text()) 
		{
			arrayPartyTimeName.push($(this).text());
			if ($(this).closest('.myWekitBox').children('.myCheckBox').prop("checked")) 
			{
				bHaveTimeCheck = 1;
				arrayPartyTimeCheck.push(1) ;
			}
			else
			{
				arrayPartyTimeCheck.push(0) ;
			}
		}
		
	});
	if(0 == bHaveTimeCheck){
		notifyMsg("请选择聚会时间");
		return;
	}

	// 获取聚会地点选项
	var arrayPartyPlaceName = new Array() ;
	var arrayPartyPlaceCheck = new Array() ;
	var bHavePlaceCheck = 0;
	$('#partyPlaceItems').find('.voteLab').each(function() {
		if ('' != $(this).text()) 
		{
			arrayPartyPlaceName.push($(this).text());
			if ($(this).closest('.myWekitBox').children('.myCheckBox').prop("checked")) 
			{
				bHavePlaceCheck = 1;
				arrayPartyPlaceCheck.push(1) ;
			}
			else
			{
				arrayPartyPlaceCheck.push(0) ;
			}
		}
		
	});
	if(0 == bHavePlaceCheck){
		notifyMsg("请选择聚会地点");
		return;
	}

	// 数组转成字符串
	//var strPartyTimeNameJoin = arrayPartyTimeName.join('\&');
	var strPartyTimeCheckJoin = arrayPartyTimeCheck.join('\&');
	//var strPartyPlaceNameJoin = arrayPartyPlaceName.join('\&');
	var strPartyPlaceCheckJoin = arrayPartyPlaceCheck.join('\&');
	//console.log("strPartyTimeNameJoin:", strPartyTimeNameJoin);
	console.log("strPartyTimeCheckJoin:", strPartyTimeCheckJoin);
	//console.log("strPartyPlaceNameJoin:", strPartyPlaceNameJoin);
	console.log("strPartyPlaceCheckJoin:", strPartyPlaceCheckJoin);

	$.ajax({
		url: 'vote.php',
		type: 'post',
		data: {	"strVoteUserName" : strVoteUserName,
				"StrRandChar" : StrRandChar,
				//"strPartyTimeNameJoin" : strPartyTimeNameJoin,
				"strPartyTimeCheckJoin" : strPartyTimeCheckJoin,
				//"strPartyPlaceNameJoin" : strPartyPlaceNameJoin,
				"strPartyPlaceCheckJoin" : strPartyPlaceCheckJoin},
		success: function(response) { 
			console.log("onVote:ajax:success");
			notifyMsg('投票成功'); 
		},
		error: function(request, errorType, errorMessage) {
			console.log("onVote:ajax:error");
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onVote:end");
}

function dealResult(response)
{
	console.log("onResult:ajax:success");
	console.log("dealResult:start");
	console.log("response:", response);

	// 将每条结果转化成数组存放，数组最后一个元素为空，使用时要过滤掉
	var szRecord = response.split('\n');
	console.log("szRecord:", szRecord);

	// 填充tr、td
	$.each(szRecord,function(n,value)
	{
		if ('' == value) 
		{
			return false;
		}
		// 拆分一条记录为姓名、时间结果、地点结果
		var szParams = value.split('@') ;

		// 拼接并append表格内容到表格body里
		var strTimeChoice = szParams[1].replace(/&/g, '</td><td>');
		strTimeChoice = strTimeChoice.replace(/0/g, '×');
		strTimeChoice = strTimeChoice.replace(/1/g, '√');
		var strPlaceChoice = szParams[2].replace(/&/g, '</td><td>');
		strPlaceChoice = strPlaceChoice.replace(/0/g, '×');
		strPlaceChoice = strPlaceChoice.replace(/1/g, '√');

		var strTimeTabItem = '<tr><td>'+ szParams[0] + '</td><td>' + strTimeChoice + '</td></tr>';
		var strPlaceTabItem = '<tr><td>'+ szParams[0] + '</td><td>' + strPlaceChoice+ '</td></tr>';
		console.log("strTimeTabItem:", strTimeTabItem);
		console.log("strPlaceTabItem:", strPlaceTabItem);

		$('#tBodyTime').append($.parseHTML(strTimeTabItem));
		$('#tBodyPlace').append($.parseHTML(strPlaceTabItem));

		// 隐藏没有内容的表头
		$('th').each(function(index, el) {
		if ('' == $(this).text()) 
		{
			$(this).hide();
		}
	});
	})

	$('#voteArticle').slideUp();
	$('#resultArticle').slideDown();
	scroll(0,0);
	console.log("dealResult:end");
}

function onResult()
{
	console.log("onResult:start");
	// 获取html名称
	var StrRandChar = $('#StrRandChar').attr('name') ;
	console.log("StrRandChar:", StrRandChar);
	$.ajax({
		url: 'result.php',
		type: 'get',
		data: {"StrRandChar" : StrRandChar},
		success: dealResult,
		error: function(request, errorType, errorMessage) {
			console.log("onResult:ajax:error");
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onResult:end");
}

function onShowVotePage()
{
	console.log("onShowVotePage:start");
	$('#resultArticle').slideUp();
	$('#tBodyTime').empty();
	$('#tBodyPlace').empty();
	$('#voteArticle').slideDown();
	scroll(0,0);
	console.log("onShowVotePage:end");
}

function onInit()
{
	console.log("onInit:start");
	$('.voteLab').each(function(index, el) {
		if ('' != $(this).text()) 
		{
			$(this).closest('.myWekitBox').show('fast');
		}
	});
	console.log("onInit:end");
}

function notifyMsg(showMsg, showTime)
{
	if (!arguments[1]) {
		showTime = 1200;
	}
	if (null == showMsg || '' == showMsg) {
		return false ;
	}

	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, showTime)
}

$(document).ready(function() 
{
	$('#OnVote').on('click', onVote);
	$('#OnResult').on('click', onResult);
	$('#onShowVotePage').on('click', onShowVotePage);
	onInit();
});
