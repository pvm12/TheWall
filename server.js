const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

const con = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'thewall'
});

app.use(express.json());
let id = 3;

// app.get('/', function(req, res) {
//     res.send('Server NodeJS !');
// })

// const bricks = [
//     { id: 1, text: 'Mes1'},
//     { id: 2, text: 'Mes2'},
//     { id: 3, text: 'Mes3'}
// ];

app.get('/api/bricks', (req, res) => {
    con.query('select * from bricks', (err, data) => {
        if (err){
            res.status(500);
        } else {
            res.json(data.map(el => ({id: el.id, text: el.content})));
        }
    });
});

app.post('/api/bricks', function(req, res) {
    const sql = 'INSERT INTO bricks (content) VALUES (?)';
    con.query(sql, [req.body.text], (err, data) => {
        if (err){
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    })
})
//
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.listen(5000, () => {
    console.log('Server is running');
});

