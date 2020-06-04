const services = require('./services');
const express = require('express')
const url = require('url')
const app = express()
app.use(express.static('public'));
var fs = require('fs');
const bodyParser=require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.get('/editRequest/*', function(req, res){
console.log(req.originalUrl.split('/')[2]);
services.dbquery(`select * from contacts where number='`+req.originalUrl.split('/')[2]+`'`,function(result){
console.log(result[0]);
var numbers=result[0].number.split(':');
var emails=result[0].email.split(':');
var emailString="";
for(var i=0;i<emails.length;i++)
emailString+=`<input type="text" name="emailBox"  style="width: 400px; height: 30px; font-size: 20px; margin: 5px;" value='`+ emails[i] +`' id="email" required>`;

var numberString='';
for(var i=0;i<numbers.length;i++)
numberString+=`<input type="tel" name="numberBox"  style="width: 400px; height: 30px; font-size: 20px; margin: 5px;" value='`+ numbers[i] +`' id="number" required readonly>`;

fs.readFile('editFile.html','utf8', function(err, data) {
data=data.replace('<%name%>', result[0].name);
data=data.replace('<%date%>', result[0].dob);
data=data.replace('<%numbers%>', numberString);
data=data.replace('<%emails%>', emailString);
    res.write(data);
    return res.end();
}); 
});
});

app.get('/delete/*', function(req, res){
console.log(req.originalUrl.split('/')[2]);
services.dbquery(`delete from contacts where number='`+req.originalUrl.split('/')[2]+`'`,function(result){
res.end("deleted");
});
});
app.post('/', function(req, res){
console.log(req.body);
services.dbquery(`delete from contacts where number='`+req.body.number+`'`, function(result){});
services.dbinsert('insert into contacts values(?,?,?,?)', [req.body.name, req.body.dob, req.body.number, req.body.email], function(result){});

res.send({data : 'Successful', Status : '200'});
});
app.get('/getAllContacts', function(req, res){
services.dbquery('select * from contacts', function(result){
res.send(result);
});
});
app.get('/', function(req, res){
console.log('req');
console.log(req.body);
res.end('got');
});
app.listen(80);