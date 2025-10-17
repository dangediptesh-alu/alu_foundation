const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const { body, validationResult } = require('express-validator');
require('dotenv').config();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle registration
app.post('/register', 
    // Validation
    body('fullname').notEmpty(),
    body('college').notEmpty(),
    body('email').isEmail(),
    body('city').notEmpty(),
    body('whatsapp').notEmpty(),
    body('year').notEmpty(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, college, email, city, whatsapp, year, gender, message } = req.body;

    const sql = "INSERT INTO registrations (fullname, college, email, city, whatsapp, year, gender, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullname, college, email, city, whatsapp, year, gender, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error!");
        }
        res.send("Registration successful! ✅ Best of Luck! Keep Learning ..We are looking forward to see you in top 5");
        

    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
