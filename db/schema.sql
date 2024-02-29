DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
    id int not null auto_increment primary key,
    name varchar(30)
);

CREATE TABLE roles(
    id int not null auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id int not null auto_increment primary key,
    firstname varchar(30),
    lastname varchar(30),
    role_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id int
);
