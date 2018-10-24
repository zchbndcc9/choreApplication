# Create new database
CREATE DATABASE userInfo;
USE userInfo;

# Create table to hold key user info
CREATE TABLE Users(
	UserID int NOT NULL AUTO_INCREMENT UNIQUE,
	FamilyID int NOT NULL UNIQUE,
	LastName varchar(25),
	FirstName varchar(25),
	PRIMARY KEY (FamilyID),
    KEY(UserID)
);

# Holds private user account info
# Note: UserType = true indicates a parent user
CREATE TABLE UserDetails(
	FamilyID int NOT NULL AUTO_INCREMENT UNIQUE,
	UserName varchar(25),
	Password varchar(50),
    UserType bool,
    FOREIGN KEY (FamilyID) REFERENCES Users(FamilyID)
);

# Contact info should be consistent for entire family
CREATE TABLE FamilyInfo(
	FamilyID int NOT NULL AUTO_INCREMENT UNIQUE,
	email varchar(25),
	address varchar(100),
    phone int,
    FOREIGN KEY (FamilyID) REFERENCES Users(FamilyID)
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