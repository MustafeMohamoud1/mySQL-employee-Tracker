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
    viewDepartments();
    break;
    case "View all roles":
    viewRoles();
    break;
    case "View all employees":
    viewEmployees();
    break;
    case "Add a new department":
    addDepartment();
    break;
    case "Add a new role":
    addRole();
    break;
    case "Add a new employee":
    addEmployee();
    break;
    case "Update employee roles":
    employeeUpdate();
    break;
    case "Exit":
    connection.end();
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


    // view employees


    //add department
    function addDepartment(){
        inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Please enter the name of the new department"
            }
        ]).then(data => {
            connection.query("INSERT INTO departments SET ?", 
            {
               name: data.departmentName
            }
            );
            console.log("new department added")
            startApp()
        })

    }











    //initialize app
    startApp()
