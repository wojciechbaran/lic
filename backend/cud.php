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
if($request['type']=='add'){
 echo '';
} else if($request['type']=='userupdate'){
	$error='';
	$success=false;
	$id=$request['id'];
	foreach($request['data'] as $name => $val){
      if($name!='userid' && $name!='userType' && $name!='lastlogin' && $name!='username'){
      	$userData[$name]=mysql_real_escape_string($val);
      }			
	}
	$data = json_encode($userData);
	$sql="UPDATE users SET data='$data' WHERE id=$id";
	if(mysql_query($sql,$con)){
		$error='Dane zostały zmienione!';
		$success=true;
	} else {
		$error='Nie udało się zapisać zmiany!';
	}
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
}


echo json_encode($res);
?>