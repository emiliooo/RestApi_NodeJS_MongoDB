const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
app.use(bodyParser.json());
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('we are on home')
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => {
        console.log('conected to Db');
    })


app.listen(3000);