const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12341234",
    database: "employeeTracker_DB",

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();

});
process.on('unhandledRejection', function(err) {
    console.log(err);
});

function mainMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all Employees Names",
            "View all Employees by Department",
            "View all Employees by Manager",
            "View all Employees by Role",
            "Add Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Exit"
            // "Update by Manager",
            // "Delete"
        ],
    }).then((answer) => {
        switch (answer.action) {
            case "View all Employees by Department":
                viewAllByDepartment();
                break;

            case "View all Employees by Manager":
                viewAllByManager();
                break;

            case "View all Employees by Role":
                viewAllByRole();
                break;

            case "View all Employees Names":
                viewAllEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;

            case "Update an Employee Role":
                updateEmployeeRole();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

const viewAllEmployees = () => {
    let query = "SELECT last_name, first_name ";
    query += "FROM employee ORDER BY last_name ASC";

    connection.query(query,
        (err, res) => {
            if (err)
                throw err;
            console.table("All Employees:\n", res);
        })

    let count = "SELECT COUNT(*) as total FROM employee";
    connection.query(count,
        (err, res) => {
            if (err)
                throw err;
            console.log("Total records returned: " + res[0].total);
            console.log("Please select another action");
            console.log("\n");
            mainMenu();
        })
};

const viewAllByDepartment = () => {
    let query = "SELECT department.id AS DEPARMENT_ID, department.name AS DEPARTMENT_NAME, CONCAT(employee.first_name,' ',employee.last_name) AS EMPLOYEE, role.title AS TITLE, role.salary AS SALARY, CONCAT(manager.mgr_firstName,' ',manager.mgr_lastName) AS MANAGER, manager.id AS MANAGER_ID ";
    query += "FROM department INNER JOIN role ON role.department_id = department.id ";
    query += "INNER JOIN employee ON employee.role_id = role.id ";
    query += "LEFT JOIN manager ON manager.id = employee.manager_id ";
    query += "ORDER BY department.name ASC";


    connection.query(query,
        (err, res) => {
            if (err)
                throw err;
            console.log("\n");
            console.table("All employees by Department:\n", res);

        })
    let count = "SELECT COUNT(*) as total FROM employee";
    connection.query(count,
        (err, res) => {
            if (err)
                throw err;
            console.log("Total records returned: " + res[0].total);
            console.log("Please select another action");
            console.log("\n");
            mainMenu();
        });
}


const viewAllByRole = () => {
    let query = "SELECT role.id AS ROLE_ID, role.title AS TITLE, role.salary AS SALARY, department.id AS DEPARMENT_ID, department.name AS DEPARTMENT_NAME, CONCAT(employee.first_name,' ',employee.last_name) AS EMPLOYEE, CONCAT(manager.mgr_firstName,' ',manager.mgr_lastName) AS MANAGER, manager.id AS MANAGER_ID ";
    query += "FROM role INNER JOIN department ON department.id = role.department_id ";
    query += "INNER JOIN employee ON employee.role_id = role.id ";
    query += "LEFT JOIN manager ON manager.id = employee.manager_id ";
    query += "ORDER BY role.title ASC";


    connection.query(query,
        (err, res) => {
            if (err)
                throw err;
            console.log("\n");
            console.table("All employees by Role:\n", res);

        })
    let count = "SELECT COUNT(*) as total FROM employee";
    connection.query(count,
        (err, res) => {
            if (err)
                throw err;
            console.log("Total records returned: " + res[0].total);
            console.log("Please select another action");
            console.log("\n");
            mainMenu();
        });
}

const viewAllByManager = () => {
    let query = "SELECT manager.id AS MANAGER_ID, CONCAT(manager.mgr_firstName,' ',manager.mgr_lastName) AS MANAGER, CONCAT(employee.first_name,' ',employee.last_name) AS EMPLOYEE, role.id AS ROLE_ID, role.title AS TITLE, role.salary AS SALARY, department.name AS DEPARTMENT_NAME, department.id AS DEPARMENT_ID ";
    query += "FROM department INNER JOIN role ON role.department_id = department.id ";
    query += "INNER JOIN employee ON employee.role_id = role.id ";
    query += "LEFT JOIN manager ON manager.id = employee.manager_id ";
    query += "ORDER BY manager.mgr_lastName ASC;"

    connection.query(query,
        (err, res) => {
            if (err)
                throw err;
            console.log("\n");
            console.table("All employees by Manager:\n", res);

        })
    let count = "SELECT COUNT(*) as total FROM employee";
    connection.query(count,
        (err, res) => {
            if (err)
                throw err;
            console.log("Total records returned: " + res[0].total);
            console.log("Please select another action");
            console.log("\n");
            mainMenu();
        });
}



const addDepartment = () => {
    let query = "SELECT department.id AS DEPARMENT_ID, department.name AS DEPARTMENT_NAME FROM department ORDER BY department.name ASC";

    let count = "SELECT COUNT(*) as total FROM department";
    connection.query(count,
        (err, res) => {
            if (err)
                throw err;
            console.log("\n Total current Departments: " + res[0].total);
        })

    connection.query(query,
        (err, res) => {
            if (err)
                throw err;
            console.table(res);

            inquirer.prompt({

                    type: "input",
                    name: "department",
                    message: "What is the name of the Department you would like to add?",
                })
                .then((answer) => {
                    connection.query("INSERT INTO department SET ?", {
                            name: answer.department
                        },
                        function(err) {
                            if (err)
                                throw err;
                            console.log(answer.department + " was successfully added to Departments");
                        },
                    )

                    let newQuery = "SELECT department.id AS DEPARMENT_ID, department.name AS DEPARTMENT_NAME FROM department ORDER BY department.name ASC";
                    connection.query(newQuery,
                        (err, res) => {
                            if (err)
                                throw err;
                            console.table(res);
                            let count = "SELECT COUNT(*) as total FROM department";
                            connection.query(count,
                                (err, res) => {
                                    if (err)
                                        throw err;
                                    console.log("\n Updated Department Count: " + res[0].total);
                                    console.log("\n");
                                    mainMenu();
                                })
                        })
                })
        })
}




const addRole = () => {
    let query = "SELECT role.id AS ROLE_ID, role.title AS ROLE FROM role ORDER BY role.title ASC";
    connection.query(query,
        (err, res) => {
            console.table(res);
        })
    let count = "SELECT COUNT(*) as total FROM role";

    connection.query(count,
        (err, results) => {
            console.log("\n Current total ROLES: " + results[0].total);
        })

    connection.query("SELECT * FROM department ORDER BY department.name ASC",
        function(err, depList) {
            if (err)
                throw err;
            inquirer.prompt([{
                        type: "input",
                        name: "role",
                        message: "What is the title of the Role you would like to add?",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary for this role?",
                    },
                    {
                        name: "depChoice",
                        type: "rawlist",
                        message: "What department is this role assigned to?",
                        choices: () => {
                            let choiceArray = [];
                            for (var i = 0; i < depList.length; i++) {
                                choiceArray.push(depList[i].name);
                            }
                            return choiceArray;
                        }
                    }
                ])
                .then((answer) => {
                    let chosenDept;
                    for (var i = 0; i < depList.length; i++) {
                        if (depList[i].name === answer.depChoice) {
                            chosenDept = depList[i].id;
                        }
                    }

                    connection.query("INSERT INTO role SET ?", {
                        title: answer.role,
                        salary: answer.salary,
                        department_id: chosenDept
                    })

                    let newQuery = "SELECT role.id AS ROLE_ID, role.title AS ROLE FROM role ORDER BY role.title ASC";
                    connection.query(newQuery,
                        (err, res) => {
                            if (err)
                                throw err;
                            console.table(res);
                            let count = "SELECT COUNT(*) as total FROM role";
                            connection.query(count,
                                (err, res) => {
                                    if (err)
                                        throw err;
                                    console.log("\n Updated Role Count: " + res[0].total);
                                    console.log("\n");
                                    mainMenu();
                                })
                        })
                })
        })
}


const addEmployee = () =>
    let query = "SELECT employee.id AS EMPLOYEE_ID, last_name AS LAST_NAME, first_name AS FIRST_NAME, FROM employee ORDER BY last_name ASC";

connection.query(query,
    (err, res) => {
        console.table(res);
    })
let count = "SELECT COUNT(*) as total FROM employee";

connection.query(count,
    (err, results) => {
        console.log("\n Current number of Employees: " + results[0].total);
    })

connection.query("SELECT * FROM department ORDER BY department.name ASC",
        function(err, depList) {
            if (err)
                throw err;
            inquirer.prompt([{
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the Employee you would like to add?",

                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the Employee you would like to add?",

                    type: "rawlist",
                    choices: function() {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].role.title);
                        }
                        return choiceArray;
                    },
                    message: "What is the Employee's role?"
                }])
                .then((answer) => {
                    connection.query("INSERT INTO employee SET ?", {
                            employee: answer.employee
                        },
                        function(err) {
                            if (err) throw err;
                            console.log(answer + " was successfully added");
                            mainMenu();
                        })
                })

            const updateEmployeeRole = () => {
                connection.query("SELECT * FROM employee", function(err, results) {
                    if (err) throw err;

                    inquirer.prompt([{
                            type: "rawlist",
                            name: "choice",
                            choices: function() {
                                let choiceArray = [];
                                for (var i = 0; i < results.length; i++) {
                                    choiceArray.push(results[i].employee.name);
                                }
                                return choiceArray;
                            },
                            message: "What Employee would you like to update?",

                            type: "rawlist",
                            name: "choiceRole",
                            choices: function() {
                                let choiceRole = [];
                                for (var i = 0; i < results.length; i++) {
                                    choiceRole.push(results[i].role.id);
                                }
                                return choiceRole;
                            },
                            message: "What is the Employee's new Role ID?"
                        }])
                        .then((answer) => {
                            connection.query("UPDATE INTO employee SET ?", {
                                    name: answer.employee,
                                    id: answer.role

                                },
                                function(err) {
                                    if (err) throw err;
                                    console.log(answer + " was successfully updated");
                                })
                            mainMenu();
                        })
                })
            }