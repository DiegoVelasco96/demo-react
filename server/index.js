var express = require('express');
var app = express();

app.options('*', function(req, res){
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS').status(200).send('Ok');
})

app.get('/', function(req, res){
    res.send("Calidorist");
});

app.listen(8080, function(){
    console.log('Server On 8080');
});