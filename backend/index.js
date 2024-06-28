const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let sessions = [];

app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

app.post('/api/sessions', (req, res) => {
  const newSession = { id: uuidv4(), createdAt: new Date() };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.delete('/api/sessions/:id', (req, res) => {
  sessions = sessions.filter(session => session.id !== req.params.id);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
