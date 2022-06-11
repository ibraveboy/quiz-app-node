const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.quiz = require('./quiz.model');
db.connect = function () {
  console.log(dbConfig)
  this.mongoose.connect(`mongodb+srv://${dbConfig.username}:${dbConfig.password}@cluster0.awx2g.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
}

module.exports = db;