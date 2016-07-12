function checkInvalidChar(strInput)
{
	console.log("checkInvalidChar:start");
	console.log("strInput:", strInput);
	//notifyMsg(strInput);
	if (strInput.indexOf("\&") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“&”！");
		return false ;
	}
	if (strInput.indexOf("\@") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“@”！");
		return false ;
	}
	if (strInput.indexOf("\%") >= 0) 
	{
		notifyMsg("输入内容含有非法字符“%”！");
		return false ;
	}
	console.log("checkInvalidChar:end");
}

function onAddPartyTime()
{
	console.log("onAddPartyTime:start");
	var varPartyTimeText = $('#partyTimeText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("聚会时间未填写！");
		return false ;
	}

	if (false == checkInvalidChar(varPartyTimeText)) 
	{
		return false ;
	}
	var isHaveEmptyItem = 0 ;
	$('.partyTimeAddItem').each(function() {
		if($(this).is(':hidden'))
		{
			isHaveEmptyItem = 1;
			$(this).text(varPartyTimeText);
			$(this).slideDown("slow");
			return false ;
		}
	});

	if (0 == isHaveEmptyItem) 
	{
		notifyMsg("无法添加4个以上的聚会时间选项", 1500);
	}
	console.log("onAddPartyTime:end");
}

function onAddPartyPlace()
{
	console.log("onAddPartyPlace:start");
	var varPartyTimeText = $('#partyPlaceText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("聚会地点未填写！");
		return false ;
	}
	if (false == checkInvalidChar(varPartyTimeText)) 
	{
		return false ;
	}
	var isHaveEmptyItem = 0 ;
	$('.partyPlaceAddItem').each(function() {
		if($(this).is(':hidden'))
		{
			isHaveEmptyItem = 1;
			$(this).text(varPartyTimeText);
			$(this).slideDown("slow");
			return false ;
		}
	});

	if (0 == isHaveEmptyItem) 
	{
		notifyMsg("无法添加4个以上的聚会地点选项", 1500);
	}
	console.log("onAddPartyPlace:end");
}

function onReset()
{
	console.log("onReset:start");
	$('.partyTimeAddItem').slideUp();
	$('.partyTimeAddItem').text('');
	$('.partyPlaceAddItem').slideUp();
	$('.partyPlaceAddItem').text('');
	console.log("onReset:start");
}

function onSubmit()
{
	console.log("onSubmit:start");
	// 聚会名称
	var strPartyName = $('#partyName').val();
	if ('' == strPartyName) 
	{
		notifyMsg("请填写聚会名称", 1500);
		return false ;
	}
	if (false == checkInvalidChar(strPartyName)) 
	{
		return false ;
	}

	// 聚会时间
	var isHavePartyTime = 0;
	var arrayPartyTime = new Array('','','','') ;
	$('.partyTimeAddItem').each(function(index, el) {
		if(!$(this).is(':hidden'))
		{
			arrayPartyTime[index] = $(this).text();
			isHavePartyTime = 1;
		}
	});
	if (0 == isHavePartyTime) 
	{
		notifyMsg("请至少增加一个聚会时间选项", 1500);
		return false ;
	}
	var strPartyTimeJoin = arrayPartyTime.join('\&');

	// 聚会地点
	var isHavePartyPlace = 0;
	var arrayPartyPlace = new Array('','','','') ;
	$('.partyPlaceAddItem').each(function(index, el) {
		if(!$(this).is(':hidden'))
		{
			arrayPartyPlace[index] = $(this).text();
			isHavePartyPlace = 1;
		}
	});
	if (0 == isHavePartyPlace) 
	{
		notifyMsg("请至少增加一个聚会地点选项", 1500);
		return false ;
	}
	var strPartyPlaceJoin = arrayPartyPlace.join('\&');

	console.log("strPartyName:", strPartyName);
	console.log("strPartyTimeJoin:", strPartyTimeJoin);
	console.log("strPartyPlaceJoin:", strPartyPlaceJoin);

	// 调用服务器创建vote用的php，展示创建的vote页面
	$.ajax({
		url: 'createVote.php',
		type: 'get',
		data: {	"partyName" : strPartyName,
				"partyTimeJoin" : strPartyTimeJoin,
				"PartyPlaceJoin" : strPartyPlaceJoin},
		success: function(response) { 
			console.log("onSubmit:ajax:success");
			console.log("response:", response);
			notifyMsg('成功创建投票页面');

			window.location.href = response;
			//$('#srcVotePage').closest('a').attr("href", response);
			//$('#srcVotePage').click();
			//window.open(response);
		},
		error: function(request, errorType, errorMessage) {
			console.log("onSubmit:ajax:success");
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onSubmit:end");
}

function onSubmitTest()
{
	console.log("onSubmitTest:start");
	$.ajax({
		url: 'createVote.php',
		type: 'get',
		data: {	"partyName" : "testName",
				"partyTimeJoin" : "time1&time2&time3&",
				"PartyPlaceJoin" : "place1&place2&place3&place4"},
		success: function(response) { 
			console.log("onSubmitTest:ajax:success");
			console.log("response:", response); 

			window.location.href = response;
			//$('#srcVotePage').closest('a').attr("href", response);
			//$('#srcVotePage').click();
		},
		error: function(request, errorType, errorMessage) {
			console.log("onSubmitTest:ajax:error");
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onSubmitTest:end");
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

function changeStyle()
{
	if ('css/PirateStudio.css' == $('#pagestyle').attr("href"))
	{
		$('#pagestyle').attr("href", 'css/PirateStudio_bg.css');
		return;
	}
	if ('css/PirateStudio_bg.css' == $('#pagestyle').attr("href"))
	{
		$('#pagestyle').attr("href", 'css/PirateStudio.css');
		return;
	}
}

$(document).ready(function() 
{
	$('#onAddPartyTime').on('click', onAddPartyTime);
	$('#onAddPartyPlace').on('click', onAddPartyPlace);
	$('#onReset').on('click', onReset);
	$('#onSubmit').on('click', onSubmit);
	$('#changeStyle').on('click', changeStyle);
});
