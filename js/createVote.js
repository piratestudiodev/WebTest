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

function myActiveElement(pElement)
{
	pElement.focus();
	pElement.click();
}

function rollToElement(pElement)
{
	window.scrollTo(pElement.offset().left, pElement.offset().top - 120);
}

function onAddPartyTime()
{
	console.log("onAddPartyTime:start");
	var varPartyTimeText = $('#partyTimeText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("活动时间未填写！");	
		myActiveElement($('#partyTimeText'));
		return false ;
	}

	if (false == checkInvalidChar(varPartyTimeText)) 
	{
		myActiveElement($('#partyTimeText'));
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
		notifyMsgLong("无法添加4个以上的活动时间选项");
	}
	console.log("onAddPartyTime:end");
}

function onAddPartyPlace()
{
	console.log("onAddPartyPlace:start");
	var varPartyTimeText = $('#partyPlaceText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("活动地点未填写！");	
		myActiveElement($('#partyPlaceText'));
		return false ;
	}
	if (false == checkInvalidChar(varPartyTimeText)) 
	{
		myActiveElement($('#partyPlaceText'));
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
		notifyMsgLong("无法添加4个以上的活动地点选项");
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
	// 活动名称
	var strPartyName = $('#partyName').val();
	if ('' == strPartyName) 
	{
		rollToElement($('#partyName'));
		notifyMsgLong("请填写活动名称");
		myActiveElement($('#partyName'));
		return false ;
	}
	if (false == checkInvalidChar(strPartyName)) 
	{
		rollToElement($('#partyName'));
		myActiveElement($('#partyName'));
		return false ;
	}

	// 活动时间
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
		rollToElement($('#partyTimeText'));
		notifyMsgLong("请至少增加一个活动时间选项");
		myActiveElement($('#partyTimeText'));
		return false ;
	}
	var strPartyTimeJoin = arrayPartyTime.join('\&');

	// 活动地点
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
		rollToElement($('#partyPlaceText'));
		notifyMsgLong("请至少增加一个活动地点选项");
		myActiveElement($('#partyPlaceText'));
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

function notifyMsg(showMsg)
{
	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, 1200)
}

function notifyMsgLong(showMsg)
{
	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, 1500)
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

function AddInputToolTips(pElement, strContent)
{
	console.log("AddInputToolTips:start");
	console.log("pElement:", pElement);
	console.log("strContent:", strContent);
	var inputOpentip = new Opentip(pElement, 
		{ 
		style: 'alert',
		showOn: 'click',
		target: true,
		group: 'input',
		targetJoint: 'top left',
		tipJoint: 'bottom left',
		offset: [60,0] 
		});
	inputOpentip.setContent(strContent);
	return inputOpentip ;
	console.log("AddInputToolTips:end");
}

function AddButtonToolTips(pElementSrc, pElementTar, strContent)
{
	console.log("AddButtonToolTips:start");
	console.log("pElementSrc:", pElementSrc);
	console.log("pElementTar:", pElementTar);
	console.log("strContent:", strContent);
	var inputOpentip = new Opentip(pElementSrc, 
		{ 
		// style: 'alert',
		showOn: 'click',
		target: pElementTar,
		group: 'button',
		targetJoint: 'right',
		tipJoint: 'left' 
		});
	inputOpentip.setContent(strContent);
	return inputOpentip ;
	console.log("AddButtonToolTips:end");
}

function InitToolTips()
{
	console.log("InitToolTips:start");
	var varFirstShow = AddInputToolTips($("#partyName"), '请在此填写活动名称');
	AddInputToolTips($("#partyTimeText"), '一次添加多个时间，请以；隔开');
	AddInputToolTips($("#partyPlaceText"), '一次添加多个地点，请以；隔开');

	AddButtonToolTips($("#partyTimeText"), $("#onAddPartyTime"), '填写完后点此按钮以添加该时间');
	AddButtonToolTips($("#partyPlaceText"), $("#onAddPartyPlace"), '填写完后点此按钮以添加该地点');

	$("#partyName").focus();
	varFirstShow.show();


	// var inputOpentip = new Opentip($("#onAddPartyTime"), 
	// { 
	// 	style: 'glass',
	// 	showOn: 'click',
	// });
	// inputOpentip.setContent("hahhahahh");
	// inputOpentip.show();

	console.log("InitToolTips:end");
}

function HideAllToolTips()
{
	for(var i = 0; i < Opentip.tips.length; i ++) { Opentip.tips[i].hide();}
}

function onInputPartyName()
{
	console.log("onInputPartyName:start");
	HideAllToolTips();
	console.log("onInputPartyName:end");
}

$(document).ready(function() 
{
	$('#onAddPartyTime').on('click', onAddPartyTime);
	$('#onAddPartyPlace').on('click', onAddPartyPlace);
	$('#onReset').on('click', onReset);
	$('#onSubmit').on('click', onSubmit);

	$('#partyName').on('click', onInputPartyName);
	$('#changeStyle').on('click', changeStyle);
	InitToolTips() ;

	// 解决ios系列不支持fix的问题
	//stick the footer at the bottom of the page if we're on an iPad/iPhone due to viewport/page bugs in mobile webkit 
	// if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') 
	// { 
	//      $("#notifyMsg").css("position", "static"); 
	// };

});
