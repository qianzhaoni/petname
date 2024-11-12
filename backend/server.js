const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nameRoutes = require('./routes/names');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/names', nameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 