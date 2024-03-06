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
        case "Delete department":
          deleteDepartment(startApp);
          break;
        case "Delete role":
          deleteRole(startApp);
          break;
        case "Delete employee":
          deleteEmployee(startApp);
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
    case "Delete department":
      deleteDepartment(callback);
      break;
    case "Delete role":
      deleteRole(callback);
      break;
    case "Delete employee":
      deleteEmployee(callback);
      break;
    // Add more cases as needed
  }
}

function viewDepartments(callback) {
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
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) {
      console.error("Error fetching employees:", err);
    } else {
      console.table(res);
    }
    callback();
  });
}

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
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: data.DepartmentName,
        },
        (err) => {
          if (err) {
            console.error("Error adding department:", err);
          } else {
            console.log("new department added");
            callback();
          }
        }
      );
    });
}

function getDepartmentChoices(callback) {
  connection.query("SELECT id, name FROM departments", (err, res) => {
    if (err) {
      console.error("Error fetching departments:", err);
      callback(err, null);
    } else {
      const choices = res.map((department) => ({
        value: department.id,
        name: department.name,
      }));
      callback(null, choices);
    }
  });
}

function addRole(callback) {
  getDepartmentChoices((err, choices) => {
    if (err) {
      console.error("Error getting department choices:", err);
      return;
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "RoleTitle",
          message: "Please enter the name of the new role",
        },
        {
          type: "input",
          name: "RoleSalary",
          message: "Please enter the salary for the new role",
          validate: function (input) {
            const isValid = parseFloat(input) > 0;
            return (
              isValid || "Please enter a valid positive number for the salary."
            );
          },
        },
        {
          type: "list",
          name: "DepartmentId",
          message: "Please select the department for the new role",
          choices: choices,
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: data.RoleTitle,
            salary: parseFloat(data.RoleSalary),
            department_id: parseInt(data.DepartmentId),
          },
          (err) => {
            if (err) {
              console.error("Error adding role:", err);
            } else {
              console.log("New role added");
              callback();
            }
          }
        );
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
        name: "EmployeeLastName",
        message: "Please enter the last name of the new employee",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          firstname: data.EmployeeFirstName,
          lastname: data.EmployeeLastName,
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
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
      return;
    }
    console.log("MySQL connection closed");
  });
}

function deleteDepartment(callback) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Select the department to delete:",
        choices: getDepartmentChoicesSync(), // Synchronous function
      },
      {
        type: "confirm",
        name: "confirmDelete",
        message: "Are you sure you want to delete this department?",
        default: false,
      },
    ])
    .then((data) => {
      if (data.confirmDelete) {
        connection.query(
          "DELETE FROM departments WHERE id = ?",
          [data.departmentId],
          (err) => {
            if (err) {
              console.error("Error deleting department:", err);
            } else {
              console.log("Department deleted");
              callback();
            }
          }
        );
      } else {
        console.log("Department not deleted");
        callback();
      }
    });
}

// Function to delete a role
function deleteRole(callback) {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) {
      console.error("Error fetching roles for deletion:", err);
      callback();
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "roleId",
            message: "Select the role to delete:",
            choices: roles.map((role) => ({
              value: role.id,
              name: role.title,
            })),
          },
          {
            type: "confirm",
            name: "confirmDelete",
            message: "Are you sure you want to delete this role?",
            default: false,
          },
        ])
        .then((data) => {
          if (data.confirmDelete) {
            connection.query(
              "DELETE FROM roles WHERE id = ?",
              [data.roleId],
              (err) => {
                if (err) {
                  console.error("Error deleting role:", err);
                } else {
                  console.log("Role deleted");
                  callback();
                }
              }
            );
          } else {
            console.log("Role not deleted");
            callback();
          }
        });
    }
  });
}

// Function to delete an employee
function deleteEmployee(callback) {
  connection.query("SELECT * FROM employees", (err, employees) => {
    if (err) {
      console.error("Error fetching employees for deletion:", err);
      callback();
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee to delete:",
            choices: employees.map((employee) => ({
              value: employee.id,
              name: `${employee.firstname} ${employee.lastname}`,
            })),
          },
          {
            type: "confirm",
            name: "confirmDelete",
            message: "Are you sure you want to delete this employee?",
            default: false,
          },
        ])
        .then((data) => {
          if (data.confirmDelete) {
            connection.query(
              "DELETE FROM employees WHERE id = ?",
              [data.employeeId],
              (err) => {
                if (err) {
                  console.error("Error deleting employee:", err);
                } else {
                  console.log("Employee deleted");
                  callback();
                }
              }
            );
          } else {
            console.log("Employee not deleted");
            callback();
          }
        });
    }
  });
}

startApp();
