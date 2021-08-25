require('dotenv').config();
const mongoose = require("mongoose");

var conn_url = process.env.DB_URL
const connection = mongoose
  .connect(conn_url, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      console.log('Database connected....');
  })
  .catch((Error)=>{
      console.log('Failed to connect Database...', Error)
  })

  module.exports = connection