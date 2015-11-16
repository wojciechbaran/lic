<?php 
include('settings.php'); 
//db connection
$con = mysql_connect($host,$dbuser,$dbpass);
if (!$con){
  die(mysql_error());
}
mysql_select_db($dbname, $con);
//Functions
function chpass($pass1,$pass2){
	if($pass1!=$pass2){
		return 'Hasła nie pasują do siebie!';
	} else if (strlen($pass1) < 8) {
		return 'Podane hasło jest za krótkie!';
	// } else if( !preg_match("#[A-Z]+#", $pass1) ) {
	// 	//Password must include at least one CAPS!
	// 	return 3;
	// } else if( !preg_match("#[a-z]+#", $pass1) ) {
	// 	//Password must include at least one letter!
	// 	return 4;
	// } else if( !preg_match("#[0-9]+#", $pass1) ) {
	// 	//Password must include at least one number!
	// 	return 5;
	// } else if( !preg_match('#[-,._$%&!]+#', $pass1) ) {
	// 	//Password must include at least one special!
	// 	return 6;
	} else {
		return '';
	}
}
//request data:
$res='';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
$error='';
$success=false;
if($request['type']=='add'){
	$id=$request['id']; //if 0 - allow duplicate; if 1 - check for duplicate
	$table=$request['table'];
	foreach($request['data'] as $name => $val){
      $data[$name]=mysql_real_escape_string($val);			
	}
	$error='ddd!';
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
} else if($request['type']=='userupdate'){
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
}else if($request['type']=='changepassword'){
	$id=$request['id']; 
	$error=chpass($request['data']['password'],$request['data']['passwordrep']);
	 	if($error==''){
		$result = mysql_query("SELECT * FROM users WHERE id=$id");
		$row = mysql_fetch_array($result);
		$password=md5($request['data']['passwordold'].$row['salt']);
		if($password==$row['password']){
			$newpassword=md5($request['data']['password'].$row['salt']);
			$sql="UPDATE users SET password='$newpassword' WHERE id=$id";
			if(mysql_query($sql,$con)){
				$success=true;
				$error='Hasło zostało zmienione!';
			} else {
				$error='Nie udało się zmienić hasła!';
			}
		}else{
			$error='Podane hasło jest nieprawidłowe!';
		}
	 } 
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
}


echo json_encode($res);
?>