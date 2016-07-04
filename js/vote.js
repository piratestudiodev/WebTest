function onVote(){

	// 获取投票人昵称
	var strVoteUserName = $('#strVoteUserName').val() ;
	console.log("strVoteUserName:", strVoteUserName);
	if ('' == strVoteUserName) 
	{
		notifyMsg("请填写投票人昵称");
		return;
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
	var strPartyTimeNameJoin = arrayPartyTimeName.join('\&');
	var strPartyTimeCheckJoin = arrayPartyTimeCheck.join('\&');
	var strPartyPlaceNameJoin = arrayPartyPlaceName.join('\&');
	var strPartyPlaceCheckJoin = arrayPartyPlaceCheck.join('\&');
	console.log("strPartyTimeNameJoin:", strPartyTimeNameJoin);
	console.log("strPartyTimeCheckJoin:", strPartyTimeCheckJoin);
	console.log("strPartyPlaceNameJoin:", strPartyPlaceNameJoin);
	console.log("strPartyPlaceCheckJoin:", strPartyPlaceCheckJoin);

	$.ajax({
		url: 'vote.php',
		type: 'post',
		data: {	"strVoteUserName" : strVoteUserName,
				"StrRandChar" : StrRandChar,
				"strPartyTimeNameJoin" : strPartyTimeNameJoin,
				"strPartyTimeCheckJoin" : strPartyTimeCheckJoin,
				"strPartyPlaceNameJoin" : strPartyPlaceNameJoin,
				"strPartyPlaceCheckJoin" : strPartyPlaceCheckJoin},
		success: function(response) { 
			notifyMsg('投票成功'); 
		},
		error: function(request, errorType, errorMessage) {
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
}

function onResult(){
	console.log("onResult:");
}

function onInit()
{
	$('.voteLab').each(function(index, el) {
		if ('' != $(this).text()) 
		{
			$(this).closest('.myWekitBox').show('fast');
		}
	});
}

function notifyMsg(showMsg, showTime){
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

$(document).ready(function() {
	$('#OnVote').on('click', onVote);
	$('#OnResult').on('click', onResult);
	onInit();
});
