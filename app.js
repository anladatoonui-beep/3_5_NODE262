const express = require('express');

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

     console.log(ln);

});

app.listen(8000);