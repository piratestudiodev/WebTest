<?php
//PHP:header('Content-Type:text/html;charset=GB2312'); 

function diskLog($strLog)
{
	error_log(date("[Y-m-d H:i:s]").$strLog."\r\n", 3, "diskLog.log");
}

class RandChar
{
	function getRandChar($length)
	{
		$str = null;
		$strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
		$max = strlen($strPol)-1;

		for($i=0;$i<$length;$i++)
		{
			$str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
		}

	   return $str;
	}
}

// 随机字符串
$randCharObj = new RandChar();
$strRandChar = $randCharObj->getRandChar(6);
$strRandChar = date("YmdHis").$strRandChar;
diskLog("strRandChar:".$strRandChar) ;

// 主流程
$strPartyName = $_GET["partyName"];  
$strPartyTimeJoin = $_GET["partyTimeJoin"];  
$strPartyPlaceJoin = $_GET["PartyPlaceJoin"];
$strPartyComment = $_GET["strPartyComment"];
$arrayPartyTime = explode("&", $strPartyTimeJoin);
$arrayPartyPlace = explode("&", $strPartyPlaceJoin);

diskLog("strPartyName:".$strPartyName) ;
diskLog("strPartyTimeJoin:".$strPartyTimeJoin) ;
diskLog("strPartyPlaceJoin:".$strPartyPlaceJoin) ;
diskLog("strPartyComment:".$strPartyComment) ;

// 导入模板
$strTempletFileName = 'templateVote.html' ;
$strContent = file_get_contents($strTempletFileName);

// 替换活动名字
$strContent = str_replace("!replacePartyName!", $strPartyName, $strContent) ;
// 替换活动时间
foreach ($arrayPartyTime as $strPratyTime)
{ 
    $strContent = preg_replace("/!replacePartyTime!/", $strPratyTime, $strContent, 1) ;
    $strContent = preg_replace("/!replacePartyTimeTable!/", $strPratyTime, $strContent, 1) ;
} 
// 替换活动地点
foreach ($arrayPartyPlace as $strPartyPlace)
{ 
    $strContent = preg_replace("/!replacePartyPlace!/", $strPartyPlace, $strContent, 1) ;
    $strContent = preg_replace("/!replacePartyPlaceTable!/", $strPartyPlace, $strContent, 1) ;
} 
diskLog("Templet:\r\n".$strContent);

// 创建html
$strNewHTLMName = "vote".$strRandChar.".html" ;
// 替换html名字
$strContent = str_replace("!replaceStrRandChar!", $strRandChar, $strContent) ;
diskLog("strNewHTLMName:".$strNewHTLMName) ;
$hNewHTLMName = fopen($strNewHTLMName, "w") or diskLog("Can not create new html!");
if ($hNewHTLMName) 
{
	fwrite($hNewHTLMName, $strContent);
	fclose($hNewHTLMName);
}

echo $strNewHTLMName;
?>