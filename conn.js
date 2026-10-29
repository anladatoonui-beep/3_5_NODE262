const mysql = require('mysql');

const conn = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});

conn.connect((err)=>{
    if(err){
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = conn;