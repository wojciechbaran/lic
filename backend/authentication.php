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
function salt($lenght){
	return 'qI8lFpK5';
}
//request data:
$res='';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if($request['type']=='login'){
	$error='';
	$success=false;
	$userType='user';
	$username=mysql_real_escape_string($request['data']['username']);
	$result = mysql_query("SELECT * FROM users WHERE username='$username'");
	if($row = mysql_fetch_array($result)){
		$password=md5($request['data']['password'].$row['salt']);
		if($password==$row['password']){
			$success=true;
			$userType=$row['type'];
		}else{
			$error='Podane hasło jest nieprawidłowe!';
		}
	 }else{
	 	$error='Podany login nie istnieje!';
	 }
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error, 'userType' => $userType);
}
if($request['type']=='register'){
	$error='';
	$success=false;
	//checking lor existing logins in db
	$username=mysql_real_escape_string($request['data']['username']);
	$result = mysql_query("SELECT * FROM users WHERE username='$username'");
	if($row = mysql_fetch_array($result)){
		$error='Podany login już istnieje!';
	 } else {
		//mysqlinjection alert
		foreach($request['data'] as $name => $val){
			if($name!='password' && $name!='passwordrep' && $name!='username'){
				$userData[$name]=mysql_real_escape_string($val);
			}
		}
	 	//pass check
	 	$error=chpass($request['data']['password'],$request['data']['passwordrep']);
	 	if($error==''){
			//salt generator
			$salt = salt(8);
			$now=time();
			$password=md5($request['data']['password'].$salt);
			$data = json_encode($userData);
			$sql="INSERT INTO users (type, username, password, salt, register, lastlogin, data) 
			VALUES ('user', '$username', '$password', '$salt', $now, $now, '$data')";
			if(mysql_query($sql,$con)){
				$success=true;
			}
		}
	}
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error, 'userType' => 'user');
}
echo json_encode($res);
?>