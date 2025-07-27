const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', formRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
}); 