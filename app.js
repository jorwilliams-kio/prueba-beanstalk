const express = require('express');
// const { json } = require('express/lib/response');
let mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.testhost,
  user     : process.env.testusername,
  password : process.env.testpassword,
  port     : process.env.testport,
  database : "EBDB"
});

const app = express();
// app.use(express.json())

connection.connect(function(err) {
  if (err) {
    // console.error('Database connection failed: ' + err.stack);
    console.error('Database message: ' + err.message);
    return;
  }
  
  console.log('Connected to database !!!!.');
});

const data = connection.query('SELECT * FROM CONTEST_TYPES;', function (err, rows, fields) {
  if (err) throw err;
  console.log(rows[0].RowDataPacket.name);
});
connection.end();


app.get('/', (req, res) => {
  // console.log(data);
  // res.json(data);
  res.send("Prueba exitosa");
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
});