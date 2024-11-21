'use strict';

// const constants = require('./constants');
const port = 8080;
const express = require('express');
const app = express();

app.use(express.static('public'));
app.get('/',(req,res) =>{
    let selected = JSON.parse(req.query.data);
    var jsontext = JSON.stringify(getResult(selected));
    res.header(selected);
    res.send(jsontext);
    
});


app.listen(port, () =>{
    console.log("Listening at http://localhost:$(port)");
});