const express = require('express');
// const { json } = require('express/lib/response');
let mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.testhost,
  user     : process.env.testusername,
  password : process.env.testpassword,
  port     : process.env.testport,
  database : "EBDB"
});

const app = express();
app.use(express.json());

app.get('/database', (req, res) => {

  let resultList = "a";
  pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Database message: ' + err.message);
      return;
    }
    connection.query('SELECT * FROM CONTEST_TYPES;', function (err, result, fields) {
      if (err) {
        throw err
      };
      resultList = {...result};
      Object.keys(result).forEach((index)=>{
        // console.log(resultList.push(result[index].name));
        console.log(result[index].name);
      })
    });
    console.log('Connected to database !!!!.');
    connection.release(()=>console.log("Released connection"));
  })
  res.send(resultList);
});

app.get('/', (req, res) => {
  res.send("Prueba exitosa")
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
});