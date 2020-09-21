USE employeeTracker_DB;

INSERT INTO department (department_name) VALUES ('Service Assurance');
INSERT INTO department (department_name) VALUES ('NA Consumer Marketing');

INSERT INTO erole (title, salary, department_id) VALUES ("Technician", 80000, 0);
INSERT INTO erole (title, salary, department_id) VALUES ("Sales Representative", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("George", "Boblin", 0, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ayesha", "Washington", 1, 2);

INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Elie", "Mystal");
INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Padma", "Lakshmi");