var g_nMaxVoteOptions = 6

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

function onAddPartyPlace()
{
	console.log("onAddPartyPlace:start");
	var varPartyPlaceText = $('#partyPlaceText').val() ;
	if ('' == varPartyPlaceText) 
	{
		notifyMsg("投票选项未填写！");	
		myActiveElement($('#partyPlaceText'));
		return false ;
	}
	if (false == checkInvalidChar(varPartyPlaceText)) 
	{
		myActiveElement($('#partyPlaceText'));
		return false ;
	}

	console.log("varPartyPlaceText:", varPartyPlaceText);
	varPartyPlaceText = varPartyPlaceText.replace(/;/g, "；");
	var arrayPartyPlaceText = varPartyPlaceText.split('；');
	console.log("varPartyPlaceText:", varPartyPlaceText);
	console.log("arrayPartyPlaceText:", arrayPartyPlaceText);

	var bTips = true ;
	$.each(arrayPartyPlaceText, function(index, el) {
		if('' != el)
		{
			var bUsedItemNum = 0 ;
			$('.partyPlaceAddItem').each(function() {
				if($(this).is(':hidden'))
				{
					$(this).text(el);
					$(this).slideDown();
					return false ;
				}
				else
				{					
					if (el == $(this).text())  
					{
						if (true == bTips) 
						{
							notifyMsg("请不要添加重复选项");
							bTips = false ;
						}
						return false ;
					}
					bUsedItemNum ++ ;
				}
			});

			if (bUsedItemNum >= g_nMaxVoteOptions ) 
			{
				notifyMsgLong("无法添加6个以上的投票选项");
				return false;
			}
		}	
	});
	
	console.log("onAddPartyPlace:end");
}

function onReset()
{
	console.log("onReset:start");
	// $('.partyTimeAddItem').slideUp();
	// $('.partyTimeAddItem').text('');
	$('.partyPlaceAddItem').slideUp();
	$('.partyPlaceAddItem').text('');
	console.log("onReset:start");
}

function onSubmit()
{
	console.log("onSubmit:start");
	// 发起人名称
	var strSponsorName = $('#sponsorName').val();
	if ('' == strSponsorName) 
	{
		rollToElement($('#sponsorName'));
		notifyMsgLong("请填写投票发起人名称");
		myActiveElement($('#sponsorName'));
		return false ;
	}
	if (false == checkInvalidChar(strSponsorName)) 
	{
		rollToElement($('#sponsorName'));
		myActiveElement($('#sponsorName'));
		return false ;
	}

	// 活动名称
	var strPartyName = $('#partyName').val();
	if ('' == strPartyName) 
	{
		rollToElement($('#partyName'));
		notifyMsgLong("请填写投票名称");
		myActiveElement($('#partyName'));
		return false ;
	}
	if (false == checkInvalidChar(strPartyName)) 
	{
		rollToElement($('#partyName'));
		myActiveElement($('#partyName'));
		return false ;
	}

	// 活动备注
	var strPartyComment = $('#partyComment').val();
	if (false == checkInvalidChar(strPartyComment)) 
	{
		rollToElement($('#partyComment'));
		myActiveElement($('#partyComment'));
		return false ;
	}

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
		notifyMsgLong("请至少增加一个投票选项");
		myActiveElement($('#partyPlaceText'));
		return false ;
	}
	var strPartyPlaceJoin = arrayPartyPlace.join('\&');


	console.log("strSponsorName:", strSponsorName);
	console.log("strPartyName:", strPartyName);
	console.log("strPartyPlaceJoin:", strPartyPlaceJoin);
	console.log("strPartyComment:", strPartyComment);

	// 调用服务器创建vote用的php，展示创建的vote页面
	notifyMsgLoading('正在生成投票页面...');
	$.ajax({
		url: 'justVoteCreateVote.php',
		type: 'get',
		timeout: 10000,
		data: {	"strSponsorName" 	: strSponsorName,
				"strPartyName" 		: strPartyName,
				"PartyPlaceJoin" 	: strPartyPlaceJoin,
				"strPartyComment" 	: strPartyComment},
		success: function(response) { 
			console.log("onSubmit:ajax:success");
			console.log("response:", response);
			if (response.length > 100) 
			{
				notifyMsgLong('服务器异常错误');
			}
			else
			{
				notifyMsg('成功创建投票页面');
				window.location.href = response;
			}
		},
		error: function(request, errorType, errorMessage) {
			var strErrorMsg = 'Error: ' + errorType + ' with message: ' + errorMessage;
			console.log("onSubmitTest:ajax:error");
			console.log("strErrorMsg:", strErrorMsg);
			notifyMsgLong('生成失败。Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onSubmit:end");
}

function onSubmitTest()
{
	console.log("onSubmitTest:start");
	notifyMsgLoading('正在生成投票页面...');
	$.ajax({
		url: 'justVoteCreateVote.php',
		type: 'get',
		timeout: 10000,
		data: {	"strSponsorName" 	: "张永琥",
				"strPartyName" 		: "投票测试",
				"PartyPlaceJoin" 	: "公主坟海底捞&中关村家乐福汉拿山&西直门外大街烤鱼&必胜客",
				"strPartyComment" 	: "欢迎带家属"},
		success: function(response) { 
			console.log("onSubmitTest:ajax:success");
			console.log("response:", response); 

			if (response.length > 100) 
			{
				notifyMsgLong('服务器异常错误');
			}
			else
			{
				notifyMsg('成功创建投票页面');
				window.location.href = response;
			}
		},
		error: function(request, errorType, errorMessage) {
			var strErrorMsg = 'Error: ' + errorType + ' with message: ' + errorMessage;
			console.log("onSubmitTest:ajax:error");
			console.log("strErrorMsg:", strErrorMsg);
			notifyMsg('生成失败。Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	console.log("onSubmitTest:end");
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

function onInputPartyName()
{
	console.log("onInputPartyName:start");
	// HideAllToolTips();
	console.log("onInputPartyName:end");
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

function adjustNotifyMsgPositon()
{
	var nTop = document.body.scrollTop + (document.body.clientHeight * 0.25) ;
	// var nTop = document.body.scrollTop  ;
	console.log("nTop :", nTop );
	$('#notifyMsg').css('top', nTop);
}

$(document).ready(function() 
{
	$('#onAddPartyPlace').on('click', onAddPartyPlace);
	$('#onReset').on('click', onReset);
	$('#onSubmit').on('click', onSubmit);

	$("#partyName").focus();
});
