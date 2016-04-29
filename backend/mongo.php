<?php
//mongo
// create Collection
    $m = new MongoClient();
	$db = $m->lic;
	$col = $db->users;
	$col = $db->projects;
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
?>