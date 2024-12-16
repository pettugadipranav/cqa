const mysql = require('mysql')
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cqadb',
  multipleStatements: true
});


conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

module.exports=conn;