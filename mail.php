<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $sendTo = "johnaxeltizon@gmail.com";
  $headers = 'From :'.$email;
  $send = mail($sendTo, $name, $message, $headers);
  if($send){
    return true;
  } 
  else{
    return false;
  }