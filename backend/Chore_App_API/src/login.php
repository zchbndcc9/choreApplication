<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host="localhost"; // Host name
$username="userhere"; // Mysql username
$password="passwordhere"; // Mysql password
$db_name="userInfo"; // Database name
$tbl_name="members"; // Table name

// Connect to server and select databse.

// $link = mysqli_connect("$host", $username, $db_name, $tbl_name);
$link = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);


// Define $myusername and $mypassword
$myusername=$link->real_escape_string($_POST['myusername']);
$mypassword=$link->real_escape_string($_POST['mypassword']);

$sql = $link->prepare("SELECT * FROM $tbl_name WHERE UserName = :UserName AND Password = :Password ");

$sql->bindParam(":UserName",$username);
$sql->bindParam(":Password",$password);

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


