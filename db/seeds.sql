INSERT INTO department (name)
VALUES
    ("Department 1"),
    ("Department 2"),
    ("Department 3");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Master", 100000, 1),
    ("Underling", 20000, 1),
    ("Master", 75000, 2),
    ("Underling", 15000, 2);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
    ("David", "Stumpe", 1, NULL),
    ("Mr.", "Stumpe", 2, 1),
    ("Capt'n", "Stumpe", 3, NULL),
    ("Nugget", "Stumpe", 4, 2);