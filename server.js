const mysql = require("mysql");
const inquirer = require("inquirer");
let consoleTable = require("console.table");
// const promisemysql = require("promise-mysql");
// const util = require('util');

const connection = mysql.createConnection({
    "host": "localhost",
    // Your port; if not 3306
    "port": 3306,
    // Your username
    "user": "root",
    "password": "",
    "database": "employeetracker_DB"
});


// connection.query = util.promisify(connection.query);

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
});

const mainMenu = () => {
    inquirer
        .prompt([{
            name: "operation",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Display all Employees",
                "Display all Roles",
                "Display all Departments",
                "Add Employees",
                "Add Roles",
                "Add Departments",
                "Update Employee Role",
                "Quit"
            ],
        }])
        .then((operation) => {
            switch (operation.change) {
                case "Display all Employees":
                    displayEmp();
                    break;
                case "Display all Roles":
                    displayERole();
                    break;
                case "Display all Departments":
                    displayDep();
                    break;
                case "Add Employess":
                    addEmployees();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Add Departments":
                    addDepartments();
                    break;
                case "Update Employee Role":
                    updateEmRole();
                    break;
                case "Quit":
                    connection.end();
                    break;
            }
        });
}

// display employee //
const displayEmp = () => {
    console.log("Displaying employees...\n");

    let query = "SELECT employee.first_name, employee.last_name, employee.role_title, department.name AS department, erole.salary, concat(manager.mgr_firstName, manager.mgr_lastName) AS manager FROM department INNER JOIN role ON role.department_id = department.id INNER JOIN employee ON employee.role_id = role.id LEFT JOIN manager on manager.id = employee.manager_id ORDER by ID ASC";

    connection.query(query, function(err, res) {
        if (err) throw err
        console.log("...\n")
        console.table(res);
        mainMenu();
    });
}

//display roles//
const displayERole = () => {
        connection.query("SELECT * FROM erole", function(err, res) {
            if (err) throw err
            console.log("Roles:")
            console.table(res);
            mainMenu();
        });
    }
    //display department//
const displayDep = () => {
        connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            console.table(res);
            console.log("Department:");

            mainMenu();
        });
    }
    //add employees//
const addEmployees = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "department",
                message: "What department is the Employee assigned?",
            },
            {
                type: "input",
                name: "firstname",
                message: "What is the Employee's first name?",
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the Employee's last name?",
            },
            {
                type: "input",
                name: "roletitle",
                message: "What is the Employee's role Title?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the Employee's Manager's ID?",
            }
        ])
        .then(function(answer) {
            console.log('Adding Employee...\n');

            const query = connection.query("INSERT INTO employee SET ?", [{
                    "first_name": answer.firstName,
                    "last_name": answer.lastName,
                    "managerID": answer.manager_id
                }],

                ('INSERT INTO erole SET', [{
                    roletitle: answer.title
                }]));

            if (err) throw err;
            console.table(res);
            console.log("Department:");
            mainMenu();
        })
}

const addDepartments = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "department",
                message: "What Department would you like to add?",
            },

        ])
        .then(function(answer) {
            console.log('Adding Department...\n');

            try {
                const query = connection.query('INSERT INTO department (name) VALUES (?)', {
                    department: answer.department_name,
                });

                console.log(`${query.affectedRows} Department Updated\n`);

                console.log(query.sql);

            } catch (error) {

                console.log('addDepartment -> error', error);
            }
            mainMenu();
        })
}


// //add roles//
const addRoles = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "title",
                message: "What Title are you adding?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of this title",
            },
            {
                type: "input",
                name: "departmentID",
                message: "What department is this Title in?",
            },
        ])
        .then(function(answer) {
            console.log('Adding Employee...\n');

            try {
                const query = connection.query('INSERT INTO erole SET ?', {
                        title: answer.title,
                        salary: answer.salary,
                        departmentID: answer.department_id,
                    })
                    ('INSERT INTO erole SET', {
                        roletitle: answer.title
                    });

                console.log(`${query.affectedRows} New Role Added!\n`);


            } catch (error) {
                console.log('addRoles -> error', error);
            }
            mainMenu();
        })
}


// //update employee role//
const updateEmRole = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "Which Employee's role would you like to update (search by last name)?",
            },
            {
                type: "input",
                name: "role",
                message: "What is their new role?"
            },
        ])
        .then(function(answer) {
            console.log('Updating Employee Role...\n');

            try {
                const query = connnection.query('Update employee SET role_id = ? WHERE last_name', {
                    name: answer.name,
                    role: answer.role_id
                });
                console.log(`${query.affectedRows} Employee updated!\n`);
                console.log(query.sql);
            } catch (error) {
                console.log('updateEmRole -> error', error);
            }
            mainMenu();

        });
}