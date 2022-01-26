const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Server NodeJS !');
})

app.listen(5000, () => {
    console.log('Server is running');
});

