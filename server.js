const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
let id = 3;

// app.get('/', function(req, res) {
//     res.send('Server NodeJS !');
// })

const bricks = [
    { id: 1, text: 'Mes1'},
    { id: 2, text: 'Mes2'},
    { id: 3, text: 'Mes3'}
];

app.get('/api/bricks', function(req, res) {
    // console.log('Get all bricks');
    res.json(bricks);
})

app.post('/api/bricks', function(req, res) {
    const body = req.body;
    id++;
    const newBrick = {
        id,
        text: body.text
    }
    bricks.push(newBrick)

    res.json(newBrick);
})
//
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.listen(5000, () => {
    console.log('Server is running');
});

