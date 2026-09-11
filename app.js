const express = require('express');
const conn = require ('./conn')
const app = express();

app.use(express.static('public'));

//to parse json bodies
app.use(express.urlencoded({ extended : true }));

//setting templating engine
app.set('view engine','ejs')

//returns index page
app.get('/',(req,res)=>{
     res.render('index');
});

app.post('/register',(req,res)=>{

     const ln = req.body.ln;
     const fn = req.body.fn;
     const age = req.body.age;
     const add = req.body.add;

    
 const insert = `INSERT INTO tbl_students 
     VALUES('0','${ln}','${fn}','${age},'${add}')`

//to execute the query
conn.query(insert, (err)=>{
     if(err) throw err;
     res.send(
          `<script>
          alert('Data Inserted');
          location.href='/';
          </script>`
     )
})


});

app.listen(8000);