const express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DB_NAME
});

const app = express();

app.get('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      console.error('Database message: ' + err.message);
      return;
    }

    console.log('Connected to database !!!!.');
  });
  
  // connection.query('SELECT * FROM CATEGORIES')

  connection.end();
  res.send("Prueba Beanstalk exitosa");
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
})