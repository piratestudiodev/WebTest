<?php
$param01 = "聚会001";
$pageContents = <<< EOPAGE
		<!DOCTYPE html>

		<meta charset="UTF-8">
		<style type="text/css">
				article { display:block }
				article p { font-size:16px }
				header {font-size:18px}
				.a_read { font-size:16px }
		</style>

		<title>$param01</title>

EOPAGE;

$pageContents .= <<< EOPAGE
		<header>
			<p>用户输入标题</p>
		</header>
EOPAGE;
	$myfile = fopen('show01.html', "wb");
	fwrite($myfile, $pageContents);
	fclose($myfile);
	echo "show01.html";
?>