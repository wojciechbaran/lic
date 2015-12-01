<?php 
//Chosse Mongo Collection
$m = new MongoClient();
$db = $m->lic;
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
if($request['type']=='add'){
	$error='';
	$success=false;
	$id=$request['id']; //if 0 - allow duplicate; else - check for duplicate in columnName=id
	$table=$request['table'];
	foreach($request['data'] as $name => $val){
      $data[$name]=mysql_real_escape_string($val);			
	}
	//sprawdzanie duplikatów
	if($id){
		$duplicate = $data[$id];
		$result = mysql_query("SELECT * FROM $table WHERE $id='$duplicate'");
		if($row = mysql_fetch_array($result)){
			$error='Podana wartość już istnieje!';
		}
	} 
	if($error==''){
		//$output = implode(', ', array_map(function ($v, $k) { return sprintf("%s='%s'", $k, $v); }, $input, array_keys($input)));
		$addNames=implode(', ',array_keys($data));
		$addVal=implode('\', \'',$data);		
		$sql="INSERT INTO $table ($addNames) VALUES ('$addVal')";
		if(mysql_query($sql,$con)){
			$success=true;
			$error='Dane zostały dodane!';
			$result = mysql_query("SELECT * FROM $table ORDER BY id DESC");
			$row = mysql_fetch_array($result);
			$newid=$row['id'];
		} else {
			$error='Wystąpił błąd!';
		}
	}
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error, 'newid' => $newid);
} else if($request['type']=='changepassword'){
	$error='';
	$success=false;
	$id=$request['id']; 
	$error=chpass($request['data']['password'],$request['data']['passwordrep']);
	if($error==''){
	 	$col = $db->users;
		$query=array('id' => $id);
		$cursor = $col->find($query);
		foreach($cursor as $user){
			if(password_verify($request['data']['passwordold'], $user['password'])){
				$newpassword=password_hash($request['data']['password'], PASSWORD_DEFAULT);
				$newdata = array('$set' => array('password' => $newpassword));
				$col->update(array('id' => $id), $newdata);
				$success=true;
				$error='Hasło zostało zmienione!';
			}else{
				$error='Podane hasło jest nieprawidłowe!';
			}
		}
	}
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
} else if($request['type']=='update'){
	$error='';
	$success=false;
	$id=$request['id'];
	$table=$request['table'];
	$col = $db->{$table};
	$valto= array();
	foreach ($request['data'] as $filds) {
		foreach($filds as $name => $val){
			$valto[$name]=$val;
		}
	}	
	$newdata = array('$set' => $valto);
 	$col->update(array('id' => $id), $newdata);
	$error='Dane zostały zmienione!';
	$success=true;
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
}


echo json_encode($res);
?>