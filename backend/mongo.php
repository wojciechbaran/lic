<?php
//mongo
// create Collection
    $m = new MongoClient();
	$db = $m->lic;
	$col = $db->users;
   // $collection = $db->createCollection("users");
	$id = uniqid();
	$item = array( 
	      "id" => $id, 
	      "username" => "baranwoj", 
	      "password" => '$2y$10$r.aU/uH1Yr.r08aAD7.SRemRJZZYLXsCTDe/8OZa9RfjSY/AIzLjy',
	      "register" => "1447431663",
	      "lastlogin" => "1448880891000",
	      "type" => "user",
	      "name" => "Wojciech",
	      "surname" => "Baran"
	   );
	//$m->lic->users->insert($item);
 // $col->remove(array('id' => "1"));
 // $col->remove(array('id' => "2"));
// $newdata = array('$set' => array("type" => "admin"));
// $col->update(array("username" => "admin"), $newdata);
// $newdata = array('$set' => array("type" => "user"));
// $col->update(array("username" => "baranwoj"), $newdata);
	//$m->lic->users->insert($item);
echo '<br/>';
$query=array('username' => 'admin');
$cursor = $col->find($query);
//$cursor = $col->find();
echo $cursor->password;
echo '<br/>';
echo '<br/>';
var_dump($cursor->count());
if($cursor->count()){
	echo 'niepusty';
}else{
	echo 'pusty';
}
echo '<br/>';
echo '+++++++++++++++++++++++++++++++++++++++++++++++<br/>';
   // iterate cursor to display title of documents
	echo '<br/>';
   foreach ($cursor as $document) {
      echo $document['username'];
      echo '<br/>';
   }
   $array = iterator_to_array($cursor);
   var_dump($array);
//echo password_hash("bilbo100", PASSWORD_DEFAULT)."\n";
?>