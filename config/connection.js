// Deconstructs the connection methods from mongoose to utilize MongoDB in environment or locally
const { connect, connection } = require('mongoose');
require("dotenv").config();


// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString);

module.exports = connection;
