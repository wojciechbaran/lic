<?php
    $id = $_POST['id'];
    $path = $_POST['path'];
    $name = $_FILES["file"]["name"];
    $ext = end((explode(".", $name)));
    $fileName = uniqid();
    $link='../'.$path.'/'.$id.$fileName.'.'.$ext;
    $globalLink=$path.'/'.$id.$fileName.'.'.$ext;
    if(move_uploaded_file($_FILES["file"]["tmp_name"], $link)){
        echo json_encode(array('success' => true,'link'=>$globalLink,'name'=>$name));
    }else{
        echo json_encode(array('success' => false));
    }
?>