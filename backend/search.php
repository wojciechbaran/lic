<?php
//Chosse Mongo Collection
$m = new MongoClient();
$db = $m->lic;
//Functions
//request data:
$res='';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if($request['type']=='simple'){
	$table=$request['table'];
	$col = $db->{$table};
	$condition=$request['condition'];
	$order=$request['order'];
	$query= array();
	if($condition){
		$con = array();
		$asArr = explode( ',', $condition);
		foreach( $asArr as $val ){
		  $tmp = explode( ':', $val );
		  $con[ $tmp[0] ] = $tmp[1];
		}
		$query=$con;
	}
	if($order){
		//$query.=" ORDER BY $order";
	}
	$res=array();
	$cursor = $col->find($query);
	foreach ($cursor as $value) {
		$res[]=$value;
	}
}
echo json_encode($res);
?>