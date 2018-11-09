<?php
// Routes for Fam.ly

use Slim\Http\Request;
use Slim\Http\Response;

// php -S localhost:8080 -t public public/index.php
// ssh -i chores.pem ubuntu@18.222.217.233
// php -S 0.0.0.0:8080 -t public public/index.php
// http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080

// $host="localhost"; // Host name
// $username="userhere"; // Mysql username
// $password="passwordhere"; // Mysql password
// $db_name="Family"; // Database name
// $tbl_name="Users"; // Table name
// $db = new PDO('mysql:host=127.0.0.1:8889;dbname=Family;charset=utf8mb4', 'root', 'root'); 
$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

///////////////////////////
//         POST         //
//////////////////////////

$app->post('/user/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
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

$app->post('/childDetails/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO UserDetails (userID, familyID, rating, awards, groundedStatus) 
            VALUES (:userID, :familyID, :rating, :awards, :groundedStatus)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("rating",$input['rating']);
    $sth->bindParam("awards",$input['awards']);
    $sth->bindParam("groundedStatus",$input['groundedStatus']);
    $sth->execute();

    return $this->response->withJson($input);
});

$app->post('/familyInfo/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
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
    $sql = "INSERT INTO UserDetails (userID, assigneeID, taskID, status, notified) 
            VALUES (:userID, :assigneeID, :taskID, :status, :notified)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("assigneeID",$input['assigneeID']);
    $sth->bindParam("taskID",$input['taskID']);
    $sth->bindParam("status",$input['status']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();

    return $this->response->withJson($input);
});

$app->post('/taskDetails/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO UserDetails (taskID, taskRating, taskAward, taskTitle, taskDescription, deadline) 
            VALUES (:taskID, :taskRating, :taskAward, :taskTitle, :taskDescription, :deadline)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskID",$input['taskID']);
    $sth->bindParam("taskRating",$input['taskRating']);
    $sth->bindParam("taskAward",$input['taskAward']);
    $sth->bindParam("taskTitle",$input['taskTitle']);
    $sth->bindParam("taskDescript",$input['taskDescript']);
    $sth->bindParam("deadline",$input['deadline']);
    $sth->execute();

    return $this->response->withJson($input);
});

$app->post('/infractions/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO UserDetails (userID, infracID, infracDescript, notified) 
            VALUES (:userID, :infracID, :infracDescript, :notified)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("infracID",$input['infracID']);
    $sth->bindParam("infracDescript",$input['infracDescript']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();

    return $this->response->withJson($input);
});


///////////////////////////
//        DELETE        //
//////////////////////////

$app->delete('/users/delete/[{userID}]', function ($request, $response, $args) {

    // $db = $this->dbConn;   
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
   
    $sql = "DELETE FROM Users WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/userDetails/delete/[{userID}]', function ($request, $response, $args) {

    $db = $this->dbConn;   
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM UserDetails WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});
$app->delete('/familyInfo/delete/[{familyID}]', function ($request, $response, $args) {
 
    $db = $this->dbConn;   
    $get_id = $request->getAttribute('familyID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM FamilyInfo WHERE familyID = :familyID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/childDetails/delete/[{userID}]', function ($request, $response, $args) {
    
    $db = $this->dbConn;   
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM ChildDetails WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/tasks/delete/[{taskId}]', function ($request, $response, $args) {

    $db = $this->dbConn;   
    $get_id = $request->getAttribute('taskId');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM Tasks WHERE taskId = :taskId";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskId",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/taskDetails/delete/[{taskId}]', function ($request, $response, $args) {

    $db = $this->dbConn;   
    $get_id = $request->getAttribute('taskId');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM TaskDetails WHERE taskId = :taskId";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskId",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/infractions/delete/[{infracID}]', function ($request, $response, $args) {

    $db = $this->dbConn;   
    $get_id = $request->getAttribute('infracID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM Infractions WHERE infracID = :infracID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("infracID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});


///////////////////////////
//          PUT         //
//////////////////////////

$app->put('/users/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE users set edit=userID where edit=:userID";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();

  return $this->response->withJson($input);
});

$app->put('/userDetails/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE userDetails set edit=userID where edit=:userID";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();

  return $this->response->withJson($input);
});

$app->put('/familyInfo/edit/[{familyID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE familyInfo set edit=familyID where edit=:familyID";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();
  return $this->response->withJson($input);
});

$app->put('/childDetails/edit/ground/[{userID}]', function($request, $response, $args){

    $input=$request->getParsedBody();
    $sql="UPDATE childDetails set groundedStatus='TRUE' where userID=':userID'";
    $sth=$this->$db->prepare($sql);
    $sth->blindParam("userID",$input['userID']);
    $sth->execute();
    return $this->response->withJson($input);

});

$app->put('/childDetails/edit/unground/[{userID}]', function($request, $response, $args){

    $input=$request->getParsedBody();
    $sql="UPDATE childDetails set groundedStatus='FALSE' where userID=':userID'";
    $sth=$this->$db->prepare($sql);
    $sth->blindParam("userID",$input['userID']);
    $sth->execute();
    return $this->response->withJson($input);

});

$app->put('/tasks/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE tasks set edit=userID where edit=:userID";
  $sth=$this->$db->prepare($sql);
  $sth->blindParam("edit",$input['edit']);
  $sth->execute();
  return $this->response->withJson($input);
});

///////////////////////////
//         GET          //
//////////////////////////

$app->get('/users/[{userID}]', function($request, $response, $args){
  $db=$this->dbConn;
  $get_id=$request->getAttribute('userID');
  $sql="SELECT userID FROM users WHERE userID = :userID";
  $sth=$this->$dbConn->prepare($sql);
  $sth->blindParam("userID",$get_id);
  $result=$sth->execute();
  return $this->response->withJson($result);
});
$app->get('/userDetails/[{userID}]', function($request, $response, $args){
  $db=$this->dbConn;
  $get_id=$request->getAttribute('userID');
  $sql="SELECT userID FROM userDetails WHERE userID = :userID";
  $sth=$this->$dbConn->prepare($sql);
  $sth->blindParam("userID",$get_id);
  $result=$sth->execute();
  return $this->response->withJson($result);
});
$app->get('/childDetails/[{userID}]', function($request, $response, $args){
  $db=$this->dbConn;
  $get_id=$request->getAttribute('userID');
  $sql="SELECT userID FROM childDetails WHERE userID = :userID";
  $sth=$this->$dbConn->prepare($sql);
  $sth->blindParam("userID",$get_id);
  $result=$sth->execute();
  return $this->response->withJson($result);
});
$app->get('/taskDetails/[{taskID}]', function($request, $response, $args){
  $db=$this->dbConn;
  $get_id=$request->getAttribute('taskID');
  $sql="SELECT taskID FROM taskDetails WHERE taskID = :taskID";
  $sth=$this->$dbConn->prepare($sql);
  $sth->blindParam("taskID",$get_id);
  $result=$sth->execute();
  return $this->response->withJson($result);
});
$app->get('/infractions/[{userID}]', function($request, $response, $args){
  $db=$this->dbConn;
  $get_id=$request->getAttribute('userID');
  $sql="SELECT userID FROM infractions WHERE userID = :userID";
  $sth=$this->$dbConn->prepare($sql);
  $sth->blindParam("userID",$get_id);
  $result=$sth->execute();
  return $this->response->withJson($result);
});
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
  $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
  return $handler($req, $res);
});
?>
