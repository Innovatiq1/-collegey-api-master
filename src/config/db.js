const mongoose = require('mongoose')
const params = require('./params.js')
mongoose.Promise = global.Promise;
mongoose.connect(params.dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});