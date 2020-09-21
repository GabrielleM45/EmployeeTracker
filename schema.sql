DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE erole(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT NULL,
    Primary Key (id)

);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    manager_id INT NULL,
    Primary Key (id)

);

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    mgr_firstName VARCHAR (30) NOT NULL,
    mgr_lastName VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);
