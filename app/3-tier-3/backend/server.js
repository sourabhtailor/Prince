const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'redhat',
  database: 'sourabh1',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json());

app.post('/api/save-data', (req, res) => {
  const { data } = req.body;

  // Perform data processing and validation

  const query = 'INSERT INTO your_table (column_name) VALUES (?)';
  db.query(query, [data], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json({ message: 'Data saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

