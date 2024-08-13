const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection setup to remote server
const db = mysql.createConnection({
  host: 'localhost',  // Change this to the remote database IP address
  user: 'root',
  password: 'Shubham@559',
  database: 'flashcards_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Proxy setup for forwarding API requests
app.use('/api', createProxyMiddleware({
  target: 'http://3.110.175.178:5000',  // Remote API server
  changeOrigin: true,
}));

// Get all flashcards (this route still operates locally)
app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a new flashcard (this will also operate locally)
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) throw err;
    res.send('Flashcard added!');
  });
});

// Update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
    if (err) throw err;
    res.send('Flashcard updated!');
  });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('Flashcard deleted!');
  });
});

// Start the server on port 5000 or a custom port defined in the environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
