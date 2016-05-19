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
	$res=array();
	$cursor = $col->find($query);
	foreach ($cursor as $value) {
		$res[]=$value;
	}
}
if($request['type']=='advenced'){
	$table=$request['table'];
	$col = $db->{$table};
	$obj = json_decode($postdata);
	$cursor = $col->find($obj->condition);
	foreach ($cursor as $value) {
		$res[]=$value;
	}
}
if($request['type']=='files'){
	$local=$request['condition'];
	$path='../'.$local.'/';
	$files = array();
	if ($handle = opendir($path)) {
	    while (false !== ($entry = readdir($handle))) {
	        if ($entry != "." && $entry != "..") {
	            array_push($files,array('link'=>$local.'/'.$entry,'authorId'=>substr($entry, 0,13)));
	        }
	    }
	    closedir($handle);
	}
	$res=$files;
}
echo json_encode($res);
?>