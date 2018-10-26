# Create new database
CREATE DATABASE Family;
USE Family;

# Create table to hold key user info
CREATE TABLE Users(
	userID int NOT NULL AUTO_INCREMENT UNIQUE,
	familyID int NOT NULL UNIQUE,
	lastName varchar(25),
	firstName varchar(25),
	PRIMARY KEY (familyID),
    KEY(userID)
);

# Holds private user account info
# Note: userType = true indicates a parent user
CREATE TABLE UserDetails(
	familyID int NOT NULL AUTO_INCREMENT UNIQUE,
	username varchar(25),
	password varchar(50),
    userType bool,
    FOREIGN KEY (familyID) REFERENCES Users(familyID)
);

# Contact info should be consistent for entire family
CREATE TABLE FamilyInfo(
	familyID int NOT NULL AUTO_INCREMENT UNIQUE,
	email varchar(25),
	address varchar(100),
    phone int,
	registrationDate DATE,
    FOREIGN KEY (familyID) REFERENCES Users(familyID)
);

# Note: notified = true indicates user has been notified of task
CREATE TABLE Tasks(
	userID int,
	asigneeID int,
	taskID int AUTO_INCREMENT UNIQUE,
	taskTitle varchar(75),
	taskDescription varchar(255),
	deadline DATE,
	status varchar(255),
	notified bool
);



    
-- # See what is in tables
-- SELECT * FROM Users;
-- SELECT * FROM UserDetails;
-- SELECT * FROM FamilyInfo;
-- 
-- # Delete tables
-- DROP TABLE Users;
-- DROP TABLE UserDetails;
-- DROP TABLE FamilyInfo;