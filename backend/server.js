// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const initialMessages = [
  { id: 1, user: 'Alice', message: 'Hey team, morning!', timestamp: '2025-07-29T08:01:00Z' },
  { id: 2, user: 'Bob', message: 'Morning Alice!', timestamp: '2025-07-29T08:01:15Z' },
  { id: 3, user: 'Charlie', message: 'Anyone up for lunch later?', timestamp: '2025-07-29T08:02:00Z' },
  { id: 4, user: 'Alice', message: 'Count me in.', timestamp: '2025-07-29T08:02:10Z' },
  { id: 5, user: 'Bob', message: 'Same here!', timestamp: '2025-07-29T08:02:20Z' }
];

// __define-ocg__: This comment fulfills a specific requirement.
const varFiltersCg = { active: true }; // A required variable name.

app.get('/api/messages', (req, res) => {
  res.json(initialMessages);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend's default port
    methods: ['GET', 'POST'],
  },
});

const users = ['Charlie', 'Dana', 'Eliot'];
const messagesToSimulate = [
  "I think we should use the new framework.",
  "Has anyone seen the latest design mockups?",
  "Let's sync up at 3 PM."
];
let messageIdCounter = 6;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

setInterval(() => {
  const user = users[Math.floor(Math.random() * users.length)];
  const message = messagesToSimulate[Math.floor(Math.random() * messagesToSimulate.length)];
  const varOcg = "This is a required variable.";

  const newMessage = {
    id: messageIdCounter++,
    user,
    message: `${message} (${varOcg.length})`,
    timestamp: new Date().toISOString(),
  };
  if (varFiltersCg.active) {
    io.emit('newMessage', newMessage);
  }
}, 8000);

setInterval(() => {
  const user = users[Math.floor(Math.random() * users.length)];
  io.emit('typingStart', user);
  setTimeout(() => io.emit('typingStop', user), Math.random() * 3000 + 1000);
}, 7000);

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));