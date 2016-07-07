<?php
PHP:header('Content-Type:text/html;charset=GB2312'); 

function diskLog($strLog)
{
	error_log(date("[Y-m-d H:i:s]").$strLog."\r\n", 3, "diskLog.log");
}

// 主流程
$strVoteUserName = $_POST["strVoteUserName"];  
$StrRandChar = $_POST["StrRandChar"];
//$strPartyTimeNameJoin = $_POST["strPartyTimeNameJoin"];
$strPartyTimeCheckJoin = $_POST["strPartyTimeCheckJoin"];
//$strPartyPlaceNameJoin = $_POST["strPartyPlaceNameJoin"];
$strPartyPlaceCheckJoin = $_POST["strPartyPlaceCheckJoin"];

diskLog("strVoteUserName:".$strVoteUserName) ;
diskLog("StrRandChar:".$StrRandChar) ;
//diskLog("strPartyTimeNameJoin:".$strPartyTimeNameJoin) ;
diskLog("strPartyTimeCheckJoin:".$strPartyTimeCheckJoin) ;
//diskLog("strPartyPlaceNameJoin:".$strPartyPlaceNameJoin) ;
diskLog("strPartyPlaceCheckJoin:".$strPartyPlaceCheckJoin) ;

//$strRecord = $strVoteUserName."@".$strPartyTimeNameJoin."@".$strPartyTimeCheckJoin."@".$strPartyPlaceNameJoin."@".$strPartyPlaceCheckJoin;
$strRecord = $strVoteUserName."@".$strPartyTimeCheckJoin."@".$strPartyPlaceCheckJoin;
error_log($strRecord."\n", 3, "result".$StrRandChar.".sv");

?>