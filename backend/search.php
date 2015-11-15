<?php 
include('settings.php'); 
//db connection
$con = mysql_connect($host,$dbuser,$dbpass);
if (!$con){
  die(mysql_error());
}
mysql_select_db($dbname, $con);
//Functions
//request data:
$res='';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
echo json_encode($res);
?>