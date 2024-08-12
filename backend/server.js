const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
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

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a new flashcard
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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
