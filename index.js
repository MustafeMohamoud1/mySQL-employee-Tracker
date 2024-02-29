// cli that brings mysql connection and enables queries using inquirer and javascript
const connection = require("./connection");
const inquirer = require("inquirer");

function startApp() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What action do you want?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.action) {
        case "View all departments":
          viewDepartments(startApp);
          break;
        case "View all roles":
          viewRoles(startApp);
          break;
        case "View all employees":
          viewEmployees(startApp);
          break;
        case "Add a new department":
          addDepartment(startApp);
          break;
        case "Add a new role":
          addRole(startApp);
          break;
        case "Add a new employee":
          addEmployee(startApp);
          break;
        case "Update employee roles":
          employeeUpdate(startApp);
          break;
        case "Exit":
          executeFinalOperations();
          break;
        default:
          handleAction(response.action, startApp);
      }
    });
}

function handleAction(action, callback) {
  // Perform actions based on user input
  // Make sure to handle asynchronous operations and then call the callback
  switch (action) {
    case "View all departments":
      viewDepartments(callback);
      break;
    case "View all roles":
      viewRoles(callback);
      break;
    case "View all employees":
      viewEmployees(callback);
      break;
      case "Add a new department":
        addDepartment(callback);
        break;
      case "Add a new role":
        addRole(callback);
        break;
      case "Add a new employee":
        addEmployee(callback);
        break;
      case "Update employee roles":
        employeeUpdate(callback);
        break;
    // Add more cases as needed
  }
}

function viewDepartments(callback) {
  // connection directly to MySQL database and query keyword to start query
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      console.error("Error fetching departments:", err);
    } else {
      console.table(res);
    }
    callback();
  });
}

function viewRoles(callback) {
  // connection directly to MySQL database and query keyword to start query
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      console.error("Error fetching roles:", err);
    } else {
      console.table(res);
    }
    callback();
  });
}

function viewEmployees(callback) {
  // connection directly to MySQL database and query keyword to start query
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) {
      console.error("Error fetching employees:", err);
    } else {
      console.table(res);
    }
    callback();
  });
}

//add department
function addDepartment(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "DepartmentName",
        message: "Please enter the name of the new department",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO departments SET ?", {
        name: data.DepartmentName,
      }, (err) => {
      if (err) {
        console.error("Error adding department:", err);
      } else {
      console.log("new department added");
      callback();
      }
    });
    });
}

function addRole(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "RoleTitle",
        message: "Please enter the name of the new role",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO roles SET ?", {
        title: data.RoleTitle,
      }, (err) => {
        if (err) {
          console.error("Error adding role:", err);
        } else {
        console.log("new role added");
        callback();
        }
      });
    });
}

function addEmployee(callback) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "EmployeeFirstName",
          message: "Please enter the first name of the new employee",
        },
        {
          type: "input",
          name: "EmployeeSecondName",
          message: "Please enter the second name of the new employee",
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: data.EmployeeFirstName,
            second_name: data.EmployeeSecondName,
          },
          (err) => {
            if (err) {
              console.error("Error adding employee:", err);
            } else {
              console.log("New employee added");
              callback();
            }
          }
        );
      });
  }

function executeFinalOperations() {
    // Perform any final operations or cleanup before closing the connection
  
    // Close the MySQL connection when all operations are complete
    connection.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection:", err);
        return;
      }
      console.log("MySQL connection closed");
    });
  }

//initialize app
startApp();
