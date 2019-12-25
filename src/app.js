const Scores = require('./db');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/scores', (req, res) => {
    const queryObj = {};
    Scores.find(queryObj).sort({_id: -1}).limit(5).exec((err, found, count) => {
        res.json(found);
    });
});
app.post('/save', (req, res) => {
    Scores.create(req.body, (err, data) => {});
});


app.listen(3000);
console.log('Server started running!');