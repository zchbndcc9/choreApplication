<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host="localhost"; // Host name
$username="root"; // Mysql username
$password="root"; // Mysql password
$db_name="Family"; // Database name
$tbl_name="Users"; // Table name

// Connect to server and select databse.

// $link = mysqli_connect("$host", $username, $db_name, $tbl_name);
$link = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);


// Define $myusername and $mypassword
$myusername=$link->real_escape_string($_POST['username']);
$mypassword=$link->real_escape_string($_POST['password']);

$sql = $link->prepare("SELECT * FROM $tbl_name WHERE username = :username AND password = :password ");

$sql->bindParam(":username",$username);
$sql->bindParam(":password",$password);

if($sql->execute()) {

	if($result = $sql->get_result()){
		$count=mysqli_num_rows($result);

		if($count>=1){

			header("location:welcome.php");
		}
		else {
			echo "Wrong Username or Password.";
		}
	}

	else {
		echo "Wrong Username or Password.";
	}

}
else {
	echo "SQL unsuccessful.";
}

?>


