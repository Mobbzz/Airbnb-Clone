const mongoose = require('mongoose');
const app = require('./app');
const cors = require('cors'); // Lägg till denna rad

require('dotenv').config();

// Använd CORS-middleware
app.use(cors());

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log('server running'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err));