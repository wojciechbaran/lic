<?php
    $id = $_POST['id'];
    $path = $_POST['path'];
    $fileName = basename($_FILES["file"]["name"]);
    $fileName = preg_replace('/\s+/', '', $fileName);
    $link='../'.$path.'/'.$id.$fileName;
    if(move_uploaded_file($_FILES["file"]["tmp_name"], $link)){
        echo json_encode(array('success' => true, 'link'=>$link,'name'=>$fileName));
    }else{
        echo json_encode(array('success' => false, 'link'=>$link,'name'=>$fileName));
    }
?>