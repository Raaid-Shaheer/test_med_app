const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Serve React static build files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Default route (optional)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
