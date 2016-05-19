<?php
//mongo
// create Collection
    $m = new MongoClient();
	$db = $m->lic;
	//$col = $db->users;
	$col = $db->projects;
	$block=array('a'=>'ddddddddddd','b'=>'rrrrrrrrr','c'=>3344);
	//$col->update(array('id'=>'572f4f7c18dd9','sessions.name'=> '7'),array('$addToSet' => array('sessions.$.blocks'=>$block)));
	$col->update(array('id'=>'572f4f7c18dd9','sessions.number'=> 6),array('$push' => array('sessions.$.blocks'=>$block)));
   // $collection = $db->createCollection("users");
	//$collection = $db->createCollection("projects");
	//$collection = $db->createCollection("contractors");
	// $id = uniqid();
	// $item = array( 
	//       "id" => $id, 
	//       "username" => "baranwoj", 
	//       "password" => '$2y$10$r.aU/uH1Yr.r08aAD7.SRemRJZZYLXsCTDe/8OZa9RfjSY/AIzLjy',
	//       "register" => "1447431663000",
	//       "lastlogin" => "1448880891000",
	//       "userType" => "user",
	//       "name" => "Wojciech",
	//       "surname" => "Baran"
	//    );
	//$m->lic->users->insert($item);
  // $col->remove(array('id' => "565d714f2b6bf"));
   // $col->remove(array('id' => "565db0a6be596"));
   // $col->remove(array('id' => "565db0ac63eb7"));
	$title=array('pl'=>'tytul', 'en'=>'title');
  $newdata = array('$set' => array('title' => $title));
 // $col->update(array('name' => 'test1'), $newdata);
// $newdata = array('$set' => array("type" => "user"));
// $col->update(array("username" => "baranwoj"), $newdata);
	//$m->lic->users->insert($item);
echo '<br/>';
$query=array('username' => 'admin');
$query= array();
$cursor = $col->find($query);
//$cursor = $col->find();
echo '<br/>';
var_dump($cursor->count());
if($cursor->count()){
	echo 'niepusty';
}else{
	echo 'pusty';
}
echo '<br/>';
echo '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>';
   // iterate cursor to display title of documents
	echo '<br/>';
   foreach ($cursor as $document) {
      var_dump($document);
      echo '<br/>';
   }
   // $array = iterator_to_array($cursor);
   // var_dump($array);


//echo password_hash("pass", PASSWORD_DEFAULT)."\n";


// $obj = (object) array('key' => 'val');
// $t='key';
// var_dump($obj->{$t});


// ob_start();
// var_dump($valto);
// $result = ob_get_clean();

echo '<br/>';
echo '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>';
$error='';
	$success=false;
	$id='572f4f7c18dd9';
	$table='projects';
	$col = $db->{$table};
	$newdata = array('$set' => $valto);
 	//$col->update(array('id' => $id, 'sessions.name' => '$scope.projectAddSession.name'), array('$set' => array('sessions.$.number' => 1)));
 	$col->update(array('id' => $id), array('$set' => array('name' => 'dla wykładowcow')));
	$error='Dane zostały zmienione!';
echo $error;

$query=array('id' => '572f4f7c18dd9');
$cursor = $col->find($query);
//$cursor = $col->find();
echo '<br/>';
var_dump($cursor->count());
echo '<br/>';
echo '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>';
   // iterate cursor to display title of documents
	echo '<br/>';
   foreach ($cursor as $document) {
      var_dump($document);
      echo '<br/>';
   }
?>