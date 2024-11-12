const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nameRoutes = require('./routes/names');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.vercel.app' 
    : 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api/names', nameRoutes);

// 添加错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app; 