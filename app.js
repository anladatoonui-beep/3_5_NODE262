const express = require('express');
const conn = require('./conn');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/register',(req,res)=>{
    res.render('register')
});

app.post('/register',(req,res)=>{

    const fn= req.body.fn;
    const ln = req.body.ln;
    const age = req.body.age;
    const add = req.body.add;

    const insert=`INSERT INTO student_register
    VALUES('0', '${fn}', '${ln}', '${age}', '${add}')`;
    
    conn.query(insert, (err)=>{
        if(err) throw err;
        res.send(
        `<script>
            alert('Data Inserted');
            location.href='/view';
        </script>`
        )
    
    });
});

//route for displaying data
app.get('/view',(req,res)=>{
    const getData = `SELECT * FROM student_register`;

    // to execute the query
    conn.query(getData,(err, data)=>{
        if(err) throw err;

        // reads the columns by position, so any column names work
        const students = data.map((row)=>{
            const v = Object.values(row);
            return {
                student_id: v[0],
                firstname: v[1],
                lastname: v[2],
                age: v[3],
                address: v[4]
            };
        });

        res.render('view',{
            student: students 
        });
    });
}); 

// closing of displaying data
app.get('/delete/:id', (req,res)=>{

    const del_id = req.params.id;

    const toDelete = `DELETE FROM student_register WHERE student_id = '${del_id}'`;

    conn.query(toDelete,(err)=>{
        if(err) throw err;
        res.send(`<script>
            alert('Data Deleted!');
            location.href='/view';
            </script>
            `)
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});