<?php
//Chosse Mongo Collection
$m = new MongoClient();
$db = $m->lic;
$col = $db->users;
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

$res='';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if($request['type']=='login'){
	$error='';
	$userData='';
	$success=false;
	$username=$request['data']['username'];
	$query=array('username' => $username);
	$cursor = $col->find($query);
	if($cursor->count()){
		foreach($cursor as $admin){
			if(password_verify($request['data']['password'], $admin['password'])){
				$success=true;
				$userData = (array)$admin;
				$now=time();
				$now=$now*1000;
				$newdata = array('$set' => array('lastlogin' => "$now"));
				$col->update(array('username' => $username), $newdata);
			}else{
				$error='Podane hasło jest nieprawidłowe!';
			}
		}
	}else{
	 	$error='Podany login nie istnieje!';
	}	 
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error, 'userData' => $userData);
}
if($request['type']=='register'){
	$error='';
	$success=false;
	//checking lor existing logins in db
	$username=$request['data']['username'];
	$query=array('username' => $username);
	$cursor = $col->find($query);
	if($cursor->count()){
		$error='Podany login już istnieje!';
	 } else {
	 	//pass check
	 	$error=chpass($request['data']['password'],$request['data']['passwordrep']);
	 	if($error==''){
			$now=time();
			$now=$now*1000;
			$password=password_hash($request['data']['password'], PASSWORD_DEFAULT);
			$id = uniqid();
			$basic = array( 
			    'id' => $id, 
			    'username' => $username, 
			    'password' => $password,
			    'register' => "$now",
			    'lastlogin' => "$now",
			    'userType' => 'user'
			   );
			foreach($request['data'] as $name => $val){
				if($name!='password' && $name!='passwordrep' && $name!='username'){
					$data[$name]=$val;
				}
			}
			$userData = array_merge($basic, $data);
			$col->insert($userData);
			$success=true;
		}
	}
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
}
echo json_encode($res);
?>