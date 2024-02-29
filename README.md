Mustafe's SQL employee tracker

This command-line application is designed to efficiently manage a company's employee database. Built using Node.js, Inquirer, and MySQL, it provides a user-friendly interface for adding, viewing, updating, and deleting employee information within the database.

Features

- View Employees: Display a comprehensive list of all employees, including their names, roles, departments, salaries, and managers.
- Add Employee: Easily add a new employee to the database by providing relevant details such as name, role, department, salary, and manager.
- Update Employee Role: Modify an employee's role by selecting the desired employee and assigning a new role from the available options.
- View Departments: View a list of all departments along with their respective department IDs.
- Add Department: Add a new department to the database by providing a department name.
- View Roles: Display a list of all available roles, including their IDs, titles, and associated salaries.
- Add Role: Add a new role to the database by specifying a title, salary, and the department to which it belongs.
- Remove Employee: Remove an existing employee from the database by selecting them from the list.

Getting Started

- Clone the repository to your local machine.
 git clone https://github.com/your-username/employee-database-cli.git

- Install dependencies: npm install

- Set up the MySQL database by running the provided SQL script.

- mysql -u your_username -p < schema.sql

- Configure the database connection in index.js with your MySQL credentials.
javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'employee_db',
});

- Run the application.
node index.js

Dependencies

Node.js: The application is built on the Node.js runtime.
Inquirer: Used for interactive command-line user interfaces.
MySQL: Enables communication with the MySQL database.