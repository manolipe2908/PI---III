const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ou '123' dependendo do seu XAMPP
  database: 'conecctwork_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

module.exports = db;
