const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.get('/api/data', (req, res) => {
  // Implement your data retrieval logic here
  res.json({ message: 'Data from the backend' });
});

app.post('/api/data', (req, res) => {
  // Implement your data insertion logic here
  res.json({ message: 'Data saved to the backend' });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

