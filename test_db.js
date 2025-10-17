require('dotenv').config();
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "SET" : "EMPTY");
console.log("DB_NAME:", process.env.DB_NAME);

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err.message);
    process.exit();
  }
  console.log('DB connected successfully!');
  db.end();
});
