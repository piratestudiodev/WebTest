function isCheckBoxChecked(pElements){
	var bFlag = 0;
	pElements.find('.myCheckBox').each(function(){
		if($(this).prop("checked")){
			bFlag = 1;
		}
	});
	if (0 == bFlag)
		return false;
	else
		return true;
}

function onVote(){
	// 判断是否选择聚会时间
	var pElementsTime = $('#partyTimeItems');
	var bRet = isCheckBoxChecked(pElementsTime);
	if(false == bRet){
		alert("请选择聚会时间");
		return;
	}
	// 判断是否选择聚会地点
	var pElementsPlace = $('#partyPlaceItems');
	bRet = isCheckBoxChecked(pElementsPlace);
	if(false == bRet){
		alert("请选择聚会地点");
		return;
	}

/* 	$.ajax('https://www.baidu.com/index.html', {
		timeout: 3000,
		type:'get',
		success: function(response) { alert(success); },
		error: function(request, errorType, errorMessage) {
			alert('Error: ' + errorType + ' with message: ' + errorMessage);
		},
		beforeSend: function() {},
		complete: function() {}
	}) */

	$.ajax({
		url: 'vote.html',
		type: 'GET',
		success: function(response) { alert('success'); },
		error: function(request, errorType, errorMessage) {
			alert('Error: ' + errorType + ' with message: ' + errorMessage);
		},
		timeout: 300
	})
	
	alert('onVote end');
}

function onResult(){
	alert('onResult!');
}

$(document).ready(function() {
	$('#OnVote').on('click', onVote);
	$('#OnResult').on('click', onResult);
});
