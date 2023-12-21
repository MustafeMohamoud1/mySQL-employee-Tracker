USE employee_db;

INSERT INTO departments(name)
VALUES('management'),('engineering'),('IT');

INSERT INTO roles(title, salary, department_id)
VALUES('manager', 60000, 1), ('engineer', 40000, 2), ('technician', 30000, 3);

INSERT INTO employees(firstname, lastname, role_id, manager_id)
VALUES('John', 'Gilbert', 1, null), ('Sarah', 'Jane', 2, 1), ('Chris', 'Taylor', 3, 1);