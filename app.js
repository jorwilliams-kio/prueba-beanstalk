const express = require('express');
const mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

app.get('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });
  connection.end();

  res.send("Prueba Beanstalk exitosa");
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
})