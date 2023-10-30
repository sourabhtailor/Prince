const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  
  console.log('Database connected');

  app.use(express.json());

  app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM data';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
      res.json(results);
    });
  });

  app.post('/api/data', (req, res) => {
    const { value } = req.body;
    const sql = 'INSERT INTO data (value) VALUES (?)';
    db.query(sql, [value], (err, result) => {
      if (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Error adding data' });
        return;
      }
      res.json({ message: 'Data added successfully' });
    });
  });

  app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
  });
});

