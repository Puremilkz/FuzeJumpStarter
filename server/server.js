require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const jumpstartRoutes = require('./routes/jumpstart');
const debriefRoutes = require('./routes/debrief');
const usageRoutes = require('./routes/usage');
const setupRoutes = require('./routes/setup');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/jumpstart', jumpstartRoutes);
app.use('/api/debrief', debriefRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/setup', setupRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`FuzeJumperz AI Jumpstart server running on port ${PORT}`);
});
