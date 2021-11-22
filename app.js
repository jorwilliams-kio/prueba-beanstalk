const express = require('express');
let mysql = require('mysql');

// const connection = mysql.createConnection({
//   host     : process.env.RDS_HOSTNAME,
//   user     : process.env.RDS_USERNAME,
//   password : process.env.RDS_PASSWORD,
//   port     : process.env.RDS_PORT,
// });

const connection = mysql.createConnection({
  host     : "ebdb.csitdsxpoq37.us-east-2.rds.amazonaws.com",
  user     : "admin",
  password : "EBDBjw.93",
  port     : "3306",
  database : "EBDB"
});

const app = express();


app.get('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      // console.error('Database connection failed: ' + err.stack);
      console.error('Database message: ' + err.message);
      return;
    }
    
    console.log('Connected to database !!!!.');
  });
  
  const data = connection.query('SELECT * FROM CONTEST_TYPES')
  connection.end();
  
  res.send(data);
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
})