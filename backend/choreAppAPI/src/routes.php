<?php
// Routes for Fam.ly
header("Access-Control-Allow-Origin: *");
use Slim\Http\Request;
use Slim\Http\Response;

$app->options('/{routes:.+}', function($request, $response, $args){
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/dbtest',    function ($request, $response, $args) {
    $db = $this->db;
    $strToReturn = '';
    foreach($db->query('select * from Users') as $row) {
        $strToReturn .= '<br />' . $row['userID'];
    }
    return $response->write('' . $strToReturn);
});

///////////////////////////
//         POST         //
//////////////////////////

$app->post('/login', function($request, $response, $args){

    $input = $request->getParsedBody();
    $sth = $this->db->prepare("SELECT * FROM UserDetails WHERE username=:username AND password=:password");
    $sth->bindParam("username", $input['username']);
    $sth->bindParam("password", $input['password']);
    $sth->execute();
    $result = $sth->fetch(PDO::FETCH_OBJ);

    if($sth->execute()) {
        $count = $sth->rowCount();
        if($count>=1)
            $outcome = "true";
        else
            $outcome = "false";
    }

    $obj = (object) [
        'userID' => $result->userID,
        'familyID' => $result->familyID,
        'Success' => $outcome
    ];
    return json_encode($obj);
});

$app->post('/family/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $family_sql = "INSERT INTO FamilyInfo (email, address, phone, registrationDate)
            VALUES (:email, :address, 2146758862, CURDATE())";

    $sth = $this->db->prepare($family_sql);
    $sth->bindParam("email",$input['email']);
    $sth->bindParam("address",$input['address']);
    $sth->execute();
    $familyID = $this->db->lastInsertId();


    $users_sql = "INSERT INTO Users (familyID, lastName, firstName)
    VALUES (:familyID, :lastName, :firstName)";

    $stmt = $this->db->prepare($users_sql);
    $stmt->bindParam("familyID",$familyID);
    $stmt->bindParam("lastName",$input['lastName']);
    $stmt->bindParam("firstName",$input['firstName']);
    $stmt->execute();
    $userID = $this->db->lastInsertId();

    $ud_sql = "INSERT INTO UserDetails (userID, familyID, username, password, userType)
    VALUES (:userID, :familyID, :username, :password, :userType)";

    $userType = TRUE;
    $stmt2 = $this->db->prepare($ud_sql);
    $stmt2->bindParam("userID",$userID);
    $stmt2->bindParam("familyID",$familyID);
    $stmt2->bindParam("username",$input['email']);
    $stmt2->bindParam("password",$input['password']);
    $stmt2->bindParam("userType",$userType);
    $success = $stmt2->execute();

    if($success) {
        $count = $sth->rowCount();
        if($count>=1)
            $outcome = "true";
        else
            $outcome = "false";
    }

    $obj = (object) [
        'userID' => $userID,
        'familyID' => $familyID,
        'Success' => $outcome
    ];

    return $this->response->withJson($obj);
});

$app->post('/familyMember/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $users_sql = "INSERT INTO Users (familyID, lastName, firstName)
            VALUES (:familyID, :lastName, :firstName)";

    $sth = $this->db->prepare($users_sql);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("lastName",$input['lastName']);
    $sth->bindParam("firstName",$input['firstName']);
    $sth->execute();
    $userID = $this->db->lastInsertId();

    $ud_sql = "INSERT INTO UserDetails (userID, familyID, username, password, userType) 
            VALUES (:userID, :familyID, :username, :password, :userType)";

    $stmt = $this->db->prepare($ud_sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("familyID",$input['familyID']);
    $stmt->bindParam("username",$input['username']);
    $stmt->bindParam("password",$input['password']);
    $stmt->bindParam("userType",$input['userType']);
    $stmt->execute();

    $obj = (object) [
        'userID' => $userID,
        'familyID' => $input['familyID'],
        'lastName' => $input['lastName'],
        'firstName' => $input['firstName'],
        'username' => $input['username'],
        'isParent' => $input['userType']
    ];

    return $this->response->withJson($obj);
});
    
$app->post('/users/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO Users (userID, lastName, firstName)
            VALUES (:userID, :lastName, :firstName)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    // $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("lastName",$input['lastName']);
    $sth->bindParam("firstName",$input['firstName']);
    $sth->execute();

    return $this->response->withJson($input);
});

$app->post('/userDetails/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO UserDetails (userID,familyID, username, password, userType) 
            VALUES (:userID, :familyID, :username, :password, :userType)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("familyID",$input['familyID']);
    $sth->bindParam("username",$input['username']);
    $sth->bindParam("password",$input['password']);
    $sth->bindParam("userType",$input['userType']);
    $sth->execute();

    return $this->response->withJson($input);
});

$app->post('/childDetails/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO ChildDetails (userID, familyID, rating, awards, groundedStatus) 
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
    $sql = "INSERT INTO FamilyInfo (familyID, email, address, phone, registrationDate) 
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
    $sql = "INSERT INTO Tasks (userID, assigneeID, status, notified) 
            VALUES (:userID, :assigneeID, :status, :notified)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$input['userID']);
    $sth->bindParam("assigneeID",$input['assigneeID']);
    $sth->bindParam("status",$input['status']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    $taskID = $this->db->lastInsertId();

    $sql = "INSERT INTO TaskDetails (taskID, taskRating, taskAward, taskTitle, taskDescript, deadline) 
    VALUES (:taskID, :taskRating, :taskAward, :taskTitle, :taskDescript, :deadline)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskID",$taskID);
    $sth->bindParam("taskRating",$input['taskRating']);
    $sth->bindParam("taskAward",$input['taskAward']);
    $sth->bindParam("taskTitle",$input['taskTitle']);
    $sth->bindParam("taskDescript",$input['taskDescript']);
    $sth->bindParam("deadline",$input['deadline']);
    $sth->execute();

    $obj = (object) [
        'taskID' => $taskID
    ];

    return $this->response->withJson($obj);
});

$app->post('/infractions/add', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO Infractions (userID, infracID, infracDescript, notified) 
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
 
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
   
    $sql = "DELETE FROM Users WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/userDetails/delete/[{userID}]', function ($request, $response, $args) {
  
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM UserDetails WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});
$app->delete('/familyInfo/delete/[{familyID}]', function ($request, $response, $args) {
   
    $get_id = $request->getAttribute('familyID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM FamilyInfo WHERE familyID = :familyID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("familyID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/childDetails/delete/[{userID}]', function ($request, $response, $args) {
    
    $get_id = $request->getAttribute('userID');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM ChildDetails WHERE userID = :userID";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userID",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/tasks/delete/[{taskId}]', function ($request, $response, $args) {
 
    $get_id = $request->getAttribute('taskId');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM Tasks WHERE taskId = :taskId";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskId",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/taskDetails/delete/[{taskId}]', function ($request, $response, $args) {
 
    $get_id = $request->getAttribute('taskId');
    // $result = $conn->query($sql);
    $sql = "DELETE FROM TaskDetails WHERE taskId = :taskId";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("taskId",$get_id );
    $result = $sth->execute();

    return $this->response->withJson($result);
});

$app->delete('/infractions/delete/[{infracID}]', function ($request, $response, $args) {

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
  $sql="UPDATE Users set familyID=:familyID, lastName=:lastName, firstName=:firstName where userID=:userID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("userID",$args['userID']);
  $sth->bindParam("familyID",$input['familyID']);
  $sth->bindParam("lastName",$input['lastName']);
  $sth->bindParam("firstName",$input['firstName']);
  $sth->execute();
  return $this->response->withJson($input);
});

$app->put('/userDetails/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE UserDetails set familyID=:familyID, username=:username, password=:password, userType=:userType where userID=:userID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("userID",$args['userID']);
  $sth->bindParam("familyID",$input['familyID']);
  $sth->bindParam("username",$input['username']);
  $sth->bindParam("password",$input['password']);
  $sth->bindParam("userType",$input['userType']);
  $sth->execute();
  return $this->response->withJson($input);
});

$app->put('/familyInfo/edit/[{familyID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE FamilyInfo set email=:email, address=:address, phone=:phone, registrationDate=:registrationDate where familyID=:familyID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("familyID",$args['familyID']);
  $sth->bindParam("email",$input['email']);
  $sth->bindParam("address",$input['address']);
  $sth->bindParam("phone",$input['phone']);
  $sth->bindParam("registrationDate",$input['registrationDate']);
  $sth->execute();
  return $this->response->withJson($input);
});

$app->put('/tasks/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE Tasks set assigneeID=:assigneeID, taskID=:taskID, status=:status, notified=:notified where userID=:userID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("userID",$args['userID']);
  $sth->bindParam("assigneeID",$input['assigneeID']);
  $sth->bindParam("taskID",$input['taskID']);
  $sth->bindParam("status",$input['status']);
  $sth->bindParam("notified",$input['notified']);
  $sth->execute();
  return $this->response->withJson($input);
});
$app->put('/infractions/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE Infractions set infracID=:infracID, infracDescript=:infracDescript, notified=:notified where userID=:userID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("userID",$args['userID']);
  $sth->bindParam("infracID",$input['infracID']);
  $sth->bindParam("infracDescript",$input['infracDescript']);
  $sth->bindParam("notified",$input['notified']);
  $sth->execute();
  return $this->response->withJson($input);
});
$app->put('/taskDetails/edit/[{taskID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE TasksDetails set taskRating=:taskRating, taskAward=:taskAward, taskTitle=:taskTitle, taskDescript=:taskDescript, deadline=:deadline where taskID=:taskID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("taskID",$args['taskID']);
  $sth->bindParam("taskRating",$input['taskRating']);
  $sth->bindParam("taskAward",$input['taskAward']);
  $sth->bindParam("taskTitle",$input['taskTitle']);
  $sth->bindParam("taskDescript",$input['taskDescript']);
  $sth->bindParam("deadline",$input['deadline']);
  $sth->execute();
  return $this->response->withJson($input);
});
$app->put('/childDetails/edit/[{userID}]', function($request, $response, $args){
  $input=$request->getParsedBody();
  $sql="UPDATE ChildDetails set familyID=:familyID, rating=:rating, awards=:awards, groundedStatus=:groundedStatus where userID=:userID";
  $sth=$this->db->prepare($sql);
  $sth->bindParam("userID",$args['userID']);
  $sth->bindParam("familyID",$input['familyID']);
  $sth->bindParam("rating",$input['rating']);
  $sth->bindParam("awards",$input['awards']);
  $sth->bindParam("groundedStatus",$input['groundedStatus']);
  $sth->execute();
  return $this->response->withJson($input);
});
$app->put('/childDetails/edit/ground/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE ChildDetails set groundedStatus=:groundedStatus where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("groundedStatus",$input['groundedStatus']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/childDetails/edit/unground/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE ChildDetails set groundedStatus=:groundedStatus where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("groundedStatus",$input['groundedStatus']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/userDetails/edit/parent/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE UserDetails set userType=:userType where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("userType",$input['userType']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/userDetails/edit/child/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE UserDetails set userType=:userType where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("userType",$input['userType']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/tasks/edit/known/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE Tasks set notified=:notified where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/tasks/edit/unknown/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE Tasks set notified=:notified where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/infractions/edit/known/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE Infractions set notified=:notified where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    return $this->response->withJson($input);
});
$app->put('/infractions/edit/unknown/[{userID}]', function($request, $response, $args){
    $input=$request->getParsedBody();
    $sql="UPDATE Infractions set notified=:notified where userID=:userID";
    $sth=$this->db->prepare($sql);
    $sth->bindParam("userID",$args['userID']);
    $sth->bindParam("notified",$input['notified']);
    $sth->execute();
    return $this->response->withJson($input);
});
///////////////////////////
//         GET          //
//////////////////////////

$app->get('/login/{user}/{pass}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM UserDetails WHERE username=:user AND password=:pass");
    $sth->bindParam("user", $args['user']);
    $sth->bindParam("pass", $args['pass']);
    $sth->execute();

    if($sth->execute()) {
        $count = $sth->rowCount();
        if($count>=1)
            $outcome = "true";
        else
            $outcome = "false";
    }

    $obj = (object) [
        'Success' => $outcome
    ];
    return json_encode($obj);
});

$app->get('/users/[{id}]', function($request, $response, $args){

//    $get_id=$request->getAttribute('userID');
//          $sql="SELECT * FROM Users WHERE userID = :a;";
//    $sth=$this->db->prepare($sql);
//    $sth->bindParam("a",$get_id);
//    $result=$sth->fetchObject();
//
//
    $sth = $this->db->prepare("SELECT * FROM Users WHERE userID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
     

   // return $this->response->withJson($sql);
});

$app->get('/getfamilyInfo/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM FamilyInfo WHERE familyID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});
$app->get('/getChildren/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT UD.username, UD.userID, UD.userType, U.lastName, U.firstName FROM UserDetails UD inner join Users U on UD.userID = U.userID WHERE UD.familyID=:id AND UD.userType = 0");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchAll();
    return $this->response->withJson($userInfo);
});
$app->get('/getParents/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT UD.username, UD.userID, UD.userType, U.lastName, U.firstName FROM UserDetails UD inner join Users U on UD.userID = U.userID WHERE UD.familyID=:id AND UD.userType = 1");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchAll();
    return $this->response->withJson($userInfo);
});
$app->get('/children/{id}/avg-rating', function($request, $response, $args){

    $sth = $this->db->prepare("select avg(TD.taskRating) From TaskDetails TD inner join Tasks T on T.taskID = TD.taskID where T.userID = :id and TD.taskRating > 0;");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});
$app->get('/getTask/{id}/{id2}', function($request, $response, $args){

    $sth = $this->db->prepare("Select * FROM Tasks T inner join TaskDetails TD on T.taskID = TD.taskID WHERE T.userID=:id AND T.taskID=:id2;");
    $sth->bindParam("id", $args['id']);
    $sth->bindParam("id2", $args['id2']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});
$app->get('/getTaskAmount/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT count(taskID) FROM Tasks WHERE userID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});
$app->get('/getInfractionsAmount/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT count(infracID) FROM Infractions WHERE userID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});

$app->get('/getTasks/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM Tasks T inner join TaskDetails TD on T.taskID = TD.taskID WHERE T.userID=:id");
    $sth->bindParam("id", $args['id']);

    $sth->execute();
    $userInfo = $sth->fetchAll();
    return $this->response->withJson($userInfo);
    
});

$app->get('/getInfractions/{id}', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM Infractions WHERE userID=:id");
    $sth->bindParam("id", $args['id']);

    $sth->execute();
    $userInfo = $sth->fetchAll();
    return $this->response->withJson($userInfo);

});
$app->get('/userDetails/[{id}]', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM UserDetails WHERE userID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});

$app->get('/childDetails/[{id}]', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM ChildDetails WHERE userID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});

$app->get('/taskDetails/[{id}]', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM TaskDetails WHERE taskID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});

$app->get('/infractions/[{id}]', function($request, $response, $args){

    $sth = $this->db->prepare("SELECT * FROM Infractions WHERE infracID=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $userInfo = $sth->fetchObject();
    return $this->response->withJson($userInfo);
});

$app->map(['GET','POST','PUT','DELETE','PATCH'],'/{routes:.+}',function($req, $res){
    $handler = $this->notFoundHandler;
    return $handler($req, $res);
});

?>
