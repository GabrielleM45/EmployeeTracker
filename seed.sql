USE employeeTracker_DB;

INSERT INTO department (name) VALUES ("Software Infrastructure");
INSERT INTO department (name) VALUES ("Senior Sales Representative");
INSERT INTO department (name) VALUES ("Consumer Network Technician I");
INSERT INTO department (name) VALUES ("National Network Operations");
INSERT INTO department (name) VALUES ("IP/VOIP DevOPs");

INSERT INTO role (title, salary, department_id) VALUES ( "Infrastructure Engineer", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Sales Representative", 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Consumer Network Technician I", 52000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Operations Technician II", 68000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Engineer II", 78000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ibtihaj", "Muhammad", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elie", "Mystal", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Pavlov", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Maya", "Harris", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ayesha", "Washington", 1, 1);

INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Travis", "Bone");
INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Sally", "Ride");
INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Abahai", "Qing");
INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Turana", "Burke");
INSERT INTO manager (mgr_firstName, mgr_lastName) VALUES ("Emma", "Gonazales");
