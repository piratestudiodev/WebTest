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

	// 截断分钟以后的数值
	console.log("varPartyTimeText:", varPartyTimeText);
	var nTPos = varPartyTimeText.indexOf("T") ;
	console.log("nTPos:", nTPos);
	if (nTPos > 0) 
	{
		varPartyTimeText = varPartyTimeText.substring(0, nTPos + 6) ;
	}
	varPartyTimeText = varPartyTimeText.replace(/T/, " ") ;
	console.log("varPartyTimeText:", varPartyTimeText);

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
		else
		{
			if (varPartyTimeText == $(this).text()) 
			{
				isHaveEmptyItem = 1;
				notifyMsg("请不要添加重复时间");
				return false ;
			}
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
	var varPartyPlaceText = $('#partyPlaceText').val() ;
	if ('' == varPartyPlaceText) 
	{
		notifyMsg("活动地点未填写！");	
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
					isHaveEmptyItem = 1;
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
							notifyMsg("请不要添加重复地点");
							bTips = false ;
						}
						return false ;
					}
					bUsedItemNum ++ ;
				}
			});

			if (bUsedItemNum >=4 ) 
			{
				notifyMsgLong("无法添加4个以上的活动地点选项");
				return false;
			}
		}	
	});
	
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
	// 发起人名称
	var strSponsorName = $('#sponsorName').val();
	if ('' == strSponsorName) 
	{
		rollToElement($('#sponsorName'));
		notifyMsgLong("请填写发起人名称");
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

	// 活动备注
	var strPartyComment = $('#partyComment').val();
	if (false == checkInvalidChar(strPartyComment)) 
	{
		rollToElement($('#partyComment'));
		myActiveElement($('#partyComment'));
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


	console.log("strSponsorName:", strSponsorName);
	console.log("strPartyName:", strPartyName);
	console.log("strPartyTimeJoin:", strPartyTimeJoin);
	console.log("strPartyPlaceJoin:", strPartyPlaceJoin);
	console.log("strPartyComment:", strPartyComment);

	// 调用服务器创建vote用的php，展示创建的vote页面
	notifyMsgLoading('正在生成活动邀请函...');
	$.ajax({
		url: 'createVote.php',
		type: 'get',
		timeout: 10000,
		data: {	"strSponsorName" 	: strSponsorName,
				"strPartyName" 		: strPartyName,
				"partyTimeJoin" 	: strPartyTimeJoin,
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
	notifyMsgLoading('正在生成活动邀请函...');
	$.ajax({
		url: 'createVote.php',
		type: 'get',
		timeout: 10000,
		data: {	"strSponsorName" 	: "程杰",
				"strPartyName" 		: "周末聚会",
				"partyTimeJoin" 	: "2016-07-13 03:03&2016-08-13 04:03&2016-07-23 09:03&",
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

// function AddInputToolTips(pElement, strContent)
// {
// 	console.log("AddInputToolTips:start");
// 	console.log("pElement:", pElement);
// 	console.log("strContent:", strContent);
// 	var inputOpentip = new Opentip(pElement, 
// 		{ 
// 		style: 'alert',
// 		showOn: 'click',
// 		target: true,
// 		group: 'input',
// 		targetJoint: 'top left',
// 		tipJoint: 'bottom left',
// 		offset: [80,0] 
// 		});
// 	inputOpentip.setContent(strContent);
// 	return inputOpentip ;
// 	console.log("AddInputToolTips:end");
// }

// function AddButtonToolTips(pElementSrc, pElementTar, strContent)
// {
// 	console.log("AddButtonToolTips:start");
// 	console.log("pElementSrc:", pElementSrc);
// 	console.log("pElementTar:", pElementTar);
// 	console.log("strContent:", strContent);
// 	var inputOpentip = new Opentip(pElementSrc, 
// 		{ 
// 		style: 'dark',
// 		showOn: 'click',
// 		target: pElementTar,
// 		group: 'button',
// 		targetJoint: 'right',
// 		tipJoint: 'left' 
// 		});
// 	inputOpentip.setContent(strContent);
// 	return inputOpentip ;
// 	console.log("AddButtonToolTips:end");
// }

// function InitToolTips()
// {
// 	console.log("InitToolTips:start");
// 	var varFirstShow = AddInputToolTips($("#partyName"), '请在此填写活动名称');
// 	// AddInputToolTips($("#partyTimeText"), '请点击此处选择活动时间');
// 	AddInputToolTips($("#partyPlaceText"), '若添加多个地点，请以；隔开');

// 	AddButtonToolTips($("#partyTimeText"), $("#onAddPartyTime"), '填写完后点此按钮以添加');
// 	AddButtonToolTips($("#partyPlaceText"), $("#onAddPartyPlace"), '填写完后点此按钮以添加');

// 	$("#partyName").focus();
// 	//varFirstShow.show();

// 	console.log("InitToolTips:end");
// }

// function HideAllToolTips()
// {
// 	for(var i = 0; i < Opentip.tips.length; i ++) { Opentip.tips[i].hide();}
// }

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
	Info();
	var nTop = document.body.scrollTop + (document.body.clientHeight * 0.25) ;
	// var nTop = document.body.scrollTop  ;
	console.log("nTop :", nTop );
	$('#notifyMsg').css('top', nTop);
}

function Info()
{
	console.log("document.body.clientWidth :", document.body.clientWidth );
	// 网页的工作区高度，弹出小键盘后会变压缩小
	console.log("document.body.clientHeight :", document.body.clientHeight );
	console.log("document.body.scrollWidth :", document.body.scrollWidth  );
	console.log("document.body.scrollHeight :", document.body.scrollHeight );
	// 被滚掉的距离
	console.log("document.body.scrollTop :", document.body.scrollTop );
	console.log("document.body.scrollLeft :", document.body.scrollLeft );
	console.log("window.screenTop:", window.screenTop );
	console.log("window.screen.height:", window.screen.height );
	// 恒定，不会因为小键盘弹出而变小
	console.log("window.screen.availHeight:", window.screen.availHeight );
	console.log("window.scrollTop():", $(window).scrollTop() );


}

$(document).ready(function() 
{
	$('#onAddPartyTime').on('click', onAddPartyTime);
	$('#onAddPartyPlace').on('click', onAddPartyPlace);
	$('#onReset').on('click', onReset);
	$('#onSubmit').on('click', onSubmit);

	$("#partyName").focus();

	// $('#partyName').on('click', onInputPartyName);
	// $('#changeStyle').on('click', changeStyle);
	// InitToolTips() ;
});
