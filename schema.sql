DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    PRIMARY KEY (id, name)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT NULL,
    Primary Key (id, title)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(90),
    last_name VARCHAR(90),
    role_id INT NULL,
    manager_id INT NULL,
    Primary Key (id, first_name, last_name)
);

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    mgr_firstName VARCHAR (90) NOT NULL,
    mgr_lastName VARCHAR (90) NOT NULL,
    PRIMARY KEY (id, mgr_firstName, mgr_lastName)
);
