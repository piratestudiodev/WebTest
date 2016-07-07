<?php
//PHP:header('Content-Type:text/html;charset=GB2312'); 

function diskLog($strLog)
{
	error_log(date("[Y-m-d H:i:s]").$strLog."\r\n", 3, "diskLog.log");
}

// 主流程
$StrRandChar = $_GET["StrRandChar"];
diskLog("StrRandChar:".$StrRandChar) ;

$strRecord = "";
$strFileName = "result".$StrRandChar.".sv";
diskLog("strFileName:".$strFileName) ;

// 读出所有记录并拼接成串
$handle = fopen($strFileName, 'r');
while(!feof($handle))
{
    //$strRecord=$strRecord."%".fgets($handle, 1024);
    $strRecord=$strRecord.fgets($handle, 1024);
}
fclose($handle);
diskLog("strRecord:".$strRecord) ;

echo $strRecord;

?>