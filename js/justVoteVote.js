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

function myActiveElement(pElement)
{
	pElement.focus();
	pElement.click();
}

function rollToElement(pElement)
{
	window.scrollTo(pElement.offset().left, pElement.offset().top - 120);
}

function onVote(){

	console.log("onVote:start");
	// 获取投票人昵称
	var strVoteUserName = $('#strVoteUserName').val() ;
	console.log("strVoteUserName:", strVoteUserName);
	if ('' == strVoteUserName) 
	{
		rollToElement($('#strVoteUserName'));
		notifyMsg("请填写您的姓名");
		myActiveElement($('#strVoteUserName'));
		return false;
	}

	if (false == checkInvalidChar(strVoteUserName)) 
	{
		rollToElement($('#strVoteUserName'));
		myActiveElement($('#strVoteUserName'));
		return false ;
	}

	// 获取投票人留言
	var strLeaveMessage = $('#strLeaveMessage').val() ;
	console.log("strLeaveMessage:", strLeaveMessage);

	if (false == checkInvalidChar(strLeaveMessage)) 
	{
		rollToElement($('#strLeaveMessage'));
		myActiveElement($('#strLeaveMessage'));
		return false ;
	}

	// 获取html名称
	var StrRandChar = $('#StrRandChar').attr('name') ;
	console.log("StrRandChar:", StrRandChar);

	// 获取活动地点选项
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
		rollToElement($('#partyPlaceItems'));
		notifyMsg("请至少选择一个活动地点");
		return;
	}

	// 数组转成字符串
	var strPartyPlaceCheckJoin = arrayPartyPlaceCheck.join('');
	console.log("strPartyPlaceCheckJoin:", strPartyPlaceCheckJoin);

	notifyMsgLoading('正在提交投票信息...'); 
	$.ajax({
		url: 'justVoteVote.php',
		type: 'post',
		timeout: 10000,
		data: {	"strVoteUserName" : strVoteUserName,
				"StrRandChar" : StrRandChar,
				"strPartyPlaceCheckJoin" : strPartyPlaceCheckJoin,
				"strLeaveMessage" : strLeaveMessage},
		success: function(response) { 
			console.log("onVote:ajax:success");
			notifyMsgLong('成功提交投票信息'); 
		},
		error: function(request, errorType, errorMessage) {
			var strErrorMsg = 'Error: ' + errorType + ' with message: ' + errorMessage;
			console.log("onVote:ajax:error");
			console.log("strErrorMsg:", strErrorMsg);
			notifyMsgLong('提交失败。Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onVote:end");
}

function dealResult(response)
{
	console.log("onResult:ajax:success");
	console.log("dealResult:start");
	console.log("response:", response);

	if ('' == response) 
	{
		notifyMsgLong('暂无人投票');
		return; 
	}

	notifyMsgClose();

	// 将每条结果转化成数组存放，数组最后一个元素为空，使用时要过滤掉
	var szRecord = response.split('%');
	console.log("szRecord:", szRecord);

	var bHavaLeveaMessage = false ;
	var arrayHeadPlaceElement = new Array($('#headPlace1'), $('#headPlace2'), $('#headPlace3'), $('#headPlace4'), $('#headPlace5'), $('#headPlace6'));

	// 填充tr、td
	$.each(szRecord,function(n,value)
	{
		if ('' == value) 
		{
			return false;
		}
		// 拆分一条记录为姓名、时间结果、地点结果、留言
		var szParams = value.split('@') ;

		// 拼接并append表格内容到表格body里
		var strPlaceChoice = szParams[1];
		strPlaceChoice = strPlaceChoice.replace(/0/g, '<td class = "tabelCellNo">×</td>');
		strPlaceChoice = strPlaceChoice.replace(/1/g, '<td class = "tabelCellYes">√</td>');

		var strPlaceTabItem = '<tr><td>'+ szParams[0] + '</td>' + strPlaceChoice+ '</tr>';
		console.log("strPlaceTabItem:", strPlaceTabItem);

		$('#tBodyPlace').append($.parseHTML(strPlaceTabItem));

		// 填充head颜色
		var arrayPlaceChoice = szParams[1].split('');
		$.each(arrayPlaceChoice, function(index, el) {
			if (0 == el) 
			{
				arrayHeadPlaceElement[index].removeClass('tabelCellYes');
				arrayHeadPlaceElement[index].addClass('tabelCellNo');
			}
		});

		// 提取并添加备注
		var strLeaveMessage = szParams[2] ;
		console.log("strLeaveMessage:", strLeaveMessage);

		if ('' != strLeaveMessage) 
		{
			var strPartyCommentTabItem = '<tr><td>'+ szParams[0] + '</td><td>' + strLeaveMessage + '</td></tr>';
			$('#tBodyLevelMessage').append($.parseHTML(strPartyCommentTabItem));
			bHavaLeveaMessage = true ;			
		}
	})

	// 隐藏没有内容的表头
	$('th').each(function(index, el) {
	if ('' == $(this).text()) 
	{
		$(this).hide();
	}
	});

	// 修改标题
	$('#pageTitle').text('已投票人投票结果');

	// 全部被选中的cell点亮 TODO

	//页面切换
	$('#voteArticle').slideUp();
	$('#resultArticle').slideDown();
	if (true == bHavaLeveaMessage) 
	{
		// 有留言才显示留言魔抗
		$('#articleLevelMsg').slideDown();
	}
	$('#resultArticle_button').slideDown();
	scroll(0,0);
	console.log("dealResult:end");
}

function onResult()
{
	console.log("onResult:start");
	// 获取html名称
	var StrRandChar = $('#StrRandChar').attr('name') ;
	console.log("StrRandChar:", StrRandChar);
	notifyMsgLoading('正在查询投票结果...'); 
	$.ajax({
		url: 'justVoteResult.php',
		type: 'get',
		data: {"StrRandChar" : StrRandChar},
		timeout: 10000,
		success: dealResult,
		error: function(request, errorType, errorMessage) {
			var strErrorMsg = 'Error: ' + errorType + ' with message: ' + errorMessage;
			console.log("onResult:ajax:error");
			console.log("strErrorMsg:", strErrorMsg);
			notifyMsgLong('查询失败。Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onResult:end");
}

function onShowVotePage()
{
	console.log("onShowVotePage:start");
	$('#resultArticle').slideUp();
	$('#articleLevelMsg').slideUp();
	$('#resultArticle_button').slideUp();
	$('#tBodyTime').empty();
	$('#tBodyPlace').empty();
	$('#voteArticle').slideDown();
	// 修改标题
	$('#pageTitle').text('投票');
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

	if ('' != $('#strPartyComment').text()) 
	{
		$('#strPartyComment').closest('.siteFormItem').show('fast');
	}

	$("#strVoteUserName").focus();
	console.log("onInit:end");
}

function notifyMsg(showMsg)
{
	adjustNotifyMsgPositon();
	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, 1500)
}

function notifyMsgLong(showMsg)
{
	adjustNotifyMsgPositon();
	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, 2000)
}

function notifyMsgLoading(showMsg)
{
	adjustNotifyMsgPositon();
	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, 10000)
}

function notifyMsgClose()
{
	var pMsg = $('#notifyMsg');
	pMsg.hide();
}

function adjustNotifyMsgPositon()
{
	var nTop = document.body.scrollTop + (document.body.clientHeight * 0.25) ;
	console.log("nTop :", nTop );
	$('#notifyMsg').css('top', nTop);
}

$(document).ready(function() 
{
	$('#OnVote').on('click', onVote);
	$('#OnResult').on('click', onResult);
	$('#OnShowVotePage').on('click', onShowVotePage);
	onInit();
});
