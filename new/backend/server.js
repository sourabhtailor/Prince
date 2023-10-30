const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

const pool = mariadb.createPool({
  host: 'new-db-1', // Update with the actual hostname or service name
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5, // Adjust this value as needed
});

// Testing the database connection
pool.getConnection()
  .then(conn => {
    console.log('Database connected');
    conn.end(); // Release the connection
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

app.use(express.json());

app.get('/api/data', (req, res) => {
  pool.getConnection()
    .then(conn => {
      conn.query('SELECT * FROM data')
        .then((rows) => {
          conn.end(); // Release the connection
          res.json(rows);
        })
        .catch((err) => {
          conn.end(); // Release the connection
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Error fetching data' });
        });
    })
    .catch((err) => {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Error connecting to the database' });
    });
});

app.post('/api/data', (req, res) => {
  const { value } = req.body;
  pool.getConnection()
    .then(conn => {
      conn.query('INSERT INTO data (value) VALUES (?)', [value])
        .then(() => {
          conn.end(); // Release the connection
          res.json({ message: 'Data added successfully' });
        })
        .catch((err) => {
          conn.end(); // Release the connection
          console.error('Error adding data:', err);
          res.status(500).json({ error: 'Error adding data' });
        });
    });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

