<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message = $_POST['message'];

$to = "ratheesreo@gmail.com";

$txt ="Name = ". $name . "\r\n Email = " . $email . "\r\n Message =" . $message;

$headers = "From: dreamshot@dreamspace.academy";
if($email!=NULL){
    mail($to,$txt,$headers);
}
header("Location:https://dreamshot.dreamspace.academy/");
?>