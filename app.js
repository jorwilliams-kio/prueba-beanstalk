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



app.get('/', (req, res) => {

  let resultList = [];
  pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Database message: ' + err.message);
      return;
    }
    connection.query('SELECT * FROM CONTEST_TYPES;', function (err, result, fields) {
      if (err) {
        throw err
      };
      Object.keys(result).forEach((index)=>{
        resultList.push(index);
      })
    });
    console.log('Connected to database !!!!.');
    connection.release(()=>console.log("Released connection"));
  })
  res.json(resultList);

  // let resultList = [];
  
  // connection.connect(function(err) {
  //   if (err) {
  //     console.error('Database message: ' + err.message);
  //     return;
  //   }
  //   console.log('Connected to database !!!!.');
  // });
  
  // connection.query('SELECT * FROM CONTEST_TYPES WHERE contest_type_id = 1;', function (err, result, fields) {
  //   if (err) {
  //     throw err
  //   };
  //   Object.keys(result).forEach((index)=>{
  //     resultList.push(result[index]);
  //   })
  // });
  // connection.release(()=>console.log("Released connection"));
  // res.send("Prueba exitosa");
  // res.json({resultList})
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log("Server up");
});