<?php

use Slim\Http\Request;
use Slim\Http\Response;

// php -S localhost:8080 -t public public/index.php
// ssh -i chores.pem ubuntu@18.222.217.233

// $host="localhost"; // Host name
// $username="userhere"; // Mysql username
// $password="passwordhere"; // Mysql password
// $db_name="Family"; // Database name
// $tbl_name="Users"; // Table name
// $db = new PDO('mysql:host=127.0.0.1:8889;dbname=Family;charset=utf8mb4', 'root', 'root'); 

// Routes for Fam.ly
$app->post('/user/add', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO Users (userID, familyID, lastName, firstName) 
            VALUES (:userID, :familyID, :lastName, :firstName)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("lastName",$input['lastName']);
    $sth->bindParam("firstName",$input['firstName']);
    $sth->execute();
    return $this->response->withJson($input);
});

$app->post('/userDetails/add', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO UserDetails (familyID, username, password, userType) 
            VALUES (:familyID, :username, :password, :userType)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("username",$input['username']);
    $sth->bindParam("password",$input['password']);
    $sth->bindParam("userType",$input['userType']);
    $sth->execute();
    return $this->response->withJson($input);
});

$app->post('/familyInfo/add', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO UserDetails (familyID, email, address, phone, registrationDate) 
            VALUES (:familyID, :email, :address, :phone, :registrationDate)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("email",$input['email']);
    $sth->bindParam("address",$input['address']);
    $sth->bindParam("phone",$input['phone']);
    $sth->bindParam("registrationDate",$input['registrationDate']);
    $sth->execute();
    return $this->response->withJson($input);
});
    
$app->post('/tasks/add', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    // :param
    $sql = "INSERT INTO UserDetails (userID, asigneeID, taskID, taskTitle, taskDescription, deadline, status, notified) 
            VALUES (:userID, :asigneeID, :taskID, :taskTitle, :taskDescription, :deadline, :status, :notified)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("asigneeID",$input['asigneeID']);
    $sth->bindParam("taskID",$input['taskID']);
    $sth->bindParam("taskTitle",$input['taskTitle']);
    $sth->bindParam("taskDescription",$input['taskDescription']);
    $sth->bindParam("deadline",$input['deadline']);
    $sth->bindParam("status",$input['status']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    return $this->response->withJson($input);
});

$app->delete('/users/delete/[{userID}]', function ($request, $response, $args) {
    // $input = $request->getParsedBody();
    // $sql = "SELECT familyID FROM Users WHERE userID = :userID";
    // $sth = $this->db->prepare($sql);
    // $sth->bindParam("userID",$input['userID']);
    // $family = $sth->execute();

    $result = $conn->query($sql);
    $sql = "DELETE FROM Users WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->execute();

    // $sql = "DELETE FROM UserDetails WHERE familyID = :familyID";
    // $sth = $this->db->prepare($sql);
    // $sth->bindParam("familyID",$family);
    // $sth->execute();

    // $result = $conn->query($sql);
    // $sql = "DELETE FROM Tasks WHERE userID = :userID";
    // $sth = $this->db->prepare($sql);
    // $sth->bindParam("userID",$input['userID']);
    // $sth->execute();


    return $this->response->withJson($input);
});
$app->delete('/userDetails/delete/[{familyID}]', function ($request, $response, $args) {
 
    $sql = "DELETE FROM UserDetails WHERE familyID = :familyID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$$input['familyID']);
    $sth->execute();



    return $this->response->withJson($input);
});
$app->delete('/familyInfo/delete/[{familyID}]', function ($request, $response, $args) {
 
    $sql = "DELETE FROM FamilyInfo WHERE familyID = :familyID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$$input['familyID']);
    $sth->execute();



    return $this->response->withJson($input);
});
$app->delete('/tasks/delete/[{taskId}]', function ($request, $response, $args) {
 
    $sql = "DELETE FROM Tasks WHERE taskID = :taskId";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$$input['userID']);
    $sth->execute();



    return $this->response->withJson($input);
});
$app->put('/users/edit/[{}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE users set edit='' where edit='unwanted'";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();

  return $this->response->withJson($input);
});

$app->put('/userDetails/edit/[{}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE userDetails set edit='' where edit='unwanted'";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();

  return $this->response->withJson($input);
});

$app->put('/familyInfo/edit/[{}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE familyInfo set edit='' where edit='unwanted'";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();
  return $this->response->withJson($input);
});

$app->put('/tasks/edit/[{}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE tasks set edit='' where edit='unwanted'";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();
  return $this->response->withJson($input);
});
?>
