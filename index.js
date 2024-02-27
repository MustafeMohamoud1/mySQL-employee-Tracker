// cli that brings mysql connection and enables queries using inquirer and javascript
const connection = require("./connection");
const inquirer = require ("inquirer");

function startApp() {
    inquirer.prompt([
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
    "Exit"
    ]
    }])
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
    connection.end(startApp);
    break;
    }
    });
    };


    function viewDepartments(){
        // connection directly to MySQL database and query keyword to start query
        connection.query("SELECT * FROM departments", (err, res)=>{
            if(err) throw err

            console.table(res)

                startApp()
        })
    }

    function viewRoles(){
        // connection directly to MySQL database and query keyword to start query
        connection.query("SELECT * FROM roles", (err, res)=>{
            if(err) throw err

            console.table(res)

                startApp()
        })
    }

    function viewEmployees(){
        // connection directly to MySQL database and query keyword to start query
        connection.query("SELECT * FROM employees", (err, res)=>{
            if(err) throw err

            console.table(res)

                startApp()
        })
    }


    //add department
    function addDepartment(){
        inquirer.prompt([
            {
                type: "input",
                name: "DepartmentName",
                message: "Please enter the name of the new department"
            }
        ]).then(data => {
            connection.query("INSERT INTO departments SET ?", 
            {
               name: data.DepartmentName
            }
            );
            console.log("new department added")
            startApp()
        })

    }

    function addRole(){
        inquirer.prompt([
            {
                type: "input",
                name: "RoleName",
                message: "Please enter the name of the new role"
            }
        ]).then(data => {
            connection.query("INSERT INTO roles SET ?", 
            {
               name: data.RoleName
            }
            );
            console.log("new role added")
            startApp()
        })

    }

    function addEmployee(){
        inquirer.prompt([
            {
                type: "input",
                name: "EmployeeName",
                message: "Please enter the name of the new employee"
            }
        ]).then(data => {
            connection.query("INSERT INTO employees SET ?", 
            {
               name: data.EmployeeName
            }
            );
            console.log("new employee added")
            startApp()
        })

    }










    //initialize app
    startApp()
