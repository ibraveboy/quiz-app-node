require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const corOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
db.connect();
app.get('/', (_req, res) => {
  res.send('Hello World!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));