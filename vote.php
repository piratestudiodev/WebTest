<?php
//PHP:header('Content-Type:text/html;charset=GB2312'); 

function diskLog($strLog)
{
	error_log(date("[Y-m-d H:i:s]").$strLog."\r\n", 3, "diskLog.log");
}

// 主流程
$strVoteUserName = $_POST["strVoteUserName"];  
$StrRandChar = $_POST["StrRandChar"];
$strPartyTimeCheckJoin = $_POST["strPartyTimeCheckJoin"];
$strPartyPlaceCheckJoin = $_POST["strPartyPlaceCheckJoin"];
$strLeaveMessage = $_POST["strLeaveMessage"];

diskLog("strVoteUserName:".$strVoteUserName) ;
diskLog("StrRandChar:".$StrRandChar) ;
diskLog("strPartyTimeCheckJoin:".$strPartyTimeCheckJoin) ;
diskLog("strPartyPlaceCheckJoin:".$strPartyPlaceCheckJoin) ;
diskLog("strLeaveMessage:".$strLeaveMessage) ;

$strRecord = $strVoteUserName."@".$strPartyTimeCheckJoin."@".$strPartyPlaceCheckJoin."@".$strLeaveMessage;
error_log($strRecord."%", 3, "result".$StrRandChar.".sv");

?>