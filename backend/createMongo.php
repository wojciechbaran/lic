<?php
//mongo
// create Collection
    $m = new MongoClient();
	$db = $m->lic;
    $collection = $db->createCollection("users");
	$collection = $db->createCollection("projects");
	$id = uniqid();
	$item = array( 
	      "id" => $id, 
	      "username" => "admin", 
	      "password" => '$2y$10$r.aU/uH1Yr.r08aAD7.SRemRJZZYLXsCTDe/8OZa9RfjSY/AIzLjy',
	      "register" => "1447431663000",
	      "lastlogin" => "1448880891000",
	      "userType" => "admin",
	      "name" => "Super",
	      "surname" => "Admin"
	   );
	$m->lic->users->insert($item);
?>