var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");
const util = require('util');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",


    password: "",
    database: "employeetracker_DB"
});


connection.query = util.promisify(connection.query);

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

    mainMenu();
});

const mainMenu = () => {
    return inquirer
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
            ]
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
                case "Add Roles":
                    addRoles();
                case "Add Departments":
                    addDepartments();
                    break;
                case "Update Employee Role":
                    updateEmRole();
                    break;
                case "Quit":
                    connection.end()
                    break;
            }
        });
};

//display employee//
async function displayEmp() {


    // const query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("");

        mainMenu();
    });
}

//display roles//
async function displayERole() {
    connection.query("SELECT * FROM erole", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Roles:");

        mainMenu();
    });
}
//display department//
async function displayDep() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Department:");

        mainMenu();
    });
}
//add employees//
async function addEmployees() {
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

            try {
                const query = connection.query('INSERT INTO employee SET ?', {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        managerID: answer.manager_id,
                    })
                    ('INSERT INTO erole SET', {
                        roletitle: answer.title

                    });

                console.log(`${query.affectedRows} Employee Inserted!\n`);

                updateRole();

                console.log(query.sql);

            } catch (error) {

                console.log('addEmployees -> error', error);
            }
            mainMenu();
        })
}

//update employee role//
async function updateEmRole() {
    inquirer
        .prompt([{
                type: "input",
                name: "lastname",
                message: "What is the Employee's last name you would like to update?",
            },
            {
                type: "input",
                name: "roleID",
                message: "What is the Employee's new role ID?",
            }

        ])
        .then(function(answer) {
            console.log('Updating Employee Role...\n');

            try {
                const query = connection.query('UPDATE employee SET role_id = ? WHERE last_name = ?', {
                    last_name: answer.lastName,
                    roleID: answer.role_id,

                });

                console.log(`${query.affectedRows} Employee Updated!\n`);

                updateRole();

                console.log(query.sql);

            } catch (error) {

                console.log('updateEmRole -> error', error);
            }
            mainMenu();
        })
}
async function addDepartments() {
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


//add roles//
async function addRoles() {
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
                updateRole();
                console.log(query.sql);
            } catch (error) {
                console.log('addRoles -> error', error);
            }
            mainMenu();
        })
}


//update employee role//
async function updateEmRole() {
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

        })
}