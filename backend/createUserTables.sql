
-- Create new database
CREATE DATABASE Family;
USE Family;

-- Create table to hold key user info
CREATE TABLE Users(
	userID int NOT NULL AUTO_INCREMENT UNIQUE,
	familyID int NOT NULL UNIQUE,
	lastName varchar(255),
	firstName varchar(255),
	PRIMARY KEY (familyID),
    KEY(userID)
);

-- Holds private user account info
-- Note: userType = true indicates a parent user
CREATE TABLE UserDetails(
	userID int NOT NULL,
    familyID int NOT NULL AUTO_INCREMENT UNIQUE,
	username varchar(255),
	password varchar(255),
    userType bool,
    FOREIGN KEY (familyID) REFERENCES Users(familyID)
);

-- 1 = gold, 2 = silver, 3 = bronze
CREATE TABLE ChildDetails(
    userID int NOT NULL,
	familyID int NOT NULL,
    rating double,
    awards varchar(255),
    groundedStatus bool,
    FOREIGN KEY (familyID) REFERENCES Users(familyID)
);

-- Contact info should be consistent for entire family
CREATE TABLE FamilyInfo(
	familyID int NOT NULL AUTO_INCREMENT UNIQUE,
	email varchar(255),
	address varchar(255),
    phone int,
	registrationDate DATE,
    FOREIGN KEY (familyID) REFERENCES Users(familyID)
);

-- Note: notified = true indicates user has been notified of task
CREATE TABLE Tasks(
	userID int,
	assigneeID int,
	taskID int AUTO_INCREMENT UNIQUE,
	status varchar(255),
	notified bool
);

-- Rating: 1 = gold, 2 = silver, 3 = bronze
CREATE TABLE TaskDetails(
	taskID int AUTO_INCREMENT UNIQUE,
    taskRating int,
    taskAward varchar(255),
	taskTitle varchar(255),
	taskDescript varchar(255),
	deadline DATE
);

CREATE TABLE Infractions(
    userID int NOT NULL,
    infracID int NOT NULL AUTO_INCREMENT UNIQUE,
    infracDescript varchar(255),
    notified bool
);


    
-- -- See what is in tables
-- SELECT * FROM Users;
-- SELECT * FROM UserDetails;
-- SELECT * FROM FamilyInfo;

-- -- Delete tables
-- DROP TABLE Users;
-- DROP TABLE UserDetails;
-- DROP TABLE FamilyInfo;