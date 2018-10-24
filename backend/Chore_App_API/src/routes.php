<?php

use Slim\Http\Request;
use Slim\Http\Response;

// php -S localhost:8080 -t public public/index.php

// $host="localhost"; // Host name
// $username="userhere"; // Mysql username
// $password="passwordhere"; // Mysql password
// $db_name="userInfo"; // Database name
// $tbl_name="members"; // Table name
// $db = new PDO('mysql:host=127.0.0.1:8889;dbname=userInfo;charset=utf8mb4', 'root', 'root'); 

// Routes for Fam.ly
$app->post('/addUser', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO Users (UserID, FamilyID, LastName, FirstName) 
            VALUES (:UserID, :FamilyID, :LastName, :FirstName)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("UserID",$input['UserID']);
    $sth->bindParam("FamilyID",$input['FamilyID']);
    $sth->bindParam("LastName",$input['LastName']);
    $sth->bindParam("FirstName",$input['FirstName']);
    $sth->execute();
    return $this->response->withJson($input);
});

$app->post('/addUserDetails', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO UserDetails (FamilyID, UserName, Password, UserType) 
            VALUES (:FamilyID, :UserName, :Password, :UserType)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("FamilyID",$input['FamilyID']);
    $sth->bindParam("UserName",$input['UserName']);
    $sth->bindParam("Password",$input['Password']);
    $sth->bindParam("UserType",$input['UserType']);
    $sth->execute();
    return $this->response->withJson($input);
});

$app->post('/addFamilyInfo', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO UserDetails (FamilyID, email, address, phone) 
            VALUES (:FamilyID, :email, :address, :phone)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("FamilyID",$input['FamilyID']);
    $sth->bindParam("email",$input['email']);
    $sth->bindParam("address",$input['address']);
    $sth->bindParam("phone",$input['phone']);
    $sth->execute();
    return $this->response->withJson($input);
});

?>