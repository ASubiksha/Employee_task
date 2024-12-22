const express = require("express"); 
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: "bakjgtjorngmg6rbg9et-mysql.services.clever-cloud.com",
    user: "ujwoqvtdaf79pjng",
    password: "0OEIArhbbfum45X3XWbf",
    database: "bakjgtjorngmg6rbg9et",
    port:"3306"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); 
    }
    console.log("Mysql connected successfully");
});

// API to get all employees
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM employee';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch employees' });
    }
    res.status(200).json(results);
  });
});

// API to post a new employee
app.post('/api/employee', (req, res) => {
  console.log("server")
    const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;
  
    // Insert data into the database
    const sql = `INSERT INTO employee (name, employeeId, email, phoneNumber, department, dateOfJoining, role)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [name, employeeId, email, phoneNumber, department, dateOfJoining, role], (err, result) => {
      if (err) {
        console.error(err);
  
        // Handle unique constraint violation (e.g., duplicate employeeId or email)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Employee ID or Email already exists.' });
        }
  
        return res.status(500).json({ error: 'Failed to save employee data. Please try again.' });
      }
  
      res.status(201).json({ message: 'Employee data saved successfully!' });
    });
  });

const PORT = 3016;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
