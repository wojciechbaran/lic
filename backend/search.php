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
if($request['type']=='simple'){
	$table=$request['table'];
	$condition=$request['condition'];
	$order=$request['order'];
	$query="SELECT * FROM $table";
	if($condition){
		$query.=" WHERE $condition";
	}
	if($order){
		$query.=" ORDER BY $order";
	}
	$res = array();
	$result = mysql_query($query);
	while($row = mysql_fetch_array($result)){
		array_push($res, $row);
	}
}
echo json_encode($res);
?>