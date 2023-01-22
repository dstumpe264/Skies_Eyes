const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// import console table to organize data from mysql better
const cTable = require('console.table');

const PORT = 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// Create an employee
app.post('/api/new-employee', ({body}, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  db.query(sql, params, (err, result) => {
    if (err) {

        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


// Read all employees
app.get('/api/employees', (req, res) => {
  const sql = `SELECT * FROM employee`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});
// Read employee by id
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete an employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
