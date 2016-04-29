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
	$col = $db->{$table};
	$valto= array();
	foreach($request['data'] as $name => $val){
		$valto[$name]=$val;
	}
	if($id){
		$duplicate = $valto[$id];
		$query=array($id => $valto[$id]);
		$cursor = $col->find($query);
		if($cursor->count()){
			$error='Podana wartość już istnieje!';
		}
	} 
	if($error==''){
		$uniqid =uniqid();
		$valto['id']=$uniqid;
		$col->insert($valto);
		$success=true;
		$error='Dane zostały dodane!';
		$newid=$uniqid;
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
} else if($request['type']=='singIn'){
	$error='';
	$success=false;
	$projectId=$request['id'];
	$userId=$request['table'];
	$inOrOut=$request['data'];
	if($inOrOut=='in'){
		$col = $db->projects;
		$col->update(array('id' => $projectId),array('$push' => array('users'=>$userId)));
		$col = $db->users;
		$col->update(array('id' => $userId),array('$push' => array('projects'=>$projectId)));
	} else {
		$col = $db->projects;
		$col->update(array('id' => $projectId),array('$pull' => array('users'=>$userId)));
		$col = $db->users;
		$col->update(array('id' => $userId),array('$pull' => array('projects'=>$projectId)));
	}
	$error='Dane zostały zmienione!';
	$success=true;
	$res = array('type' => $request['type'], 'success' => $success, 'message' => $error);
}


echo json_encode($res);
?>