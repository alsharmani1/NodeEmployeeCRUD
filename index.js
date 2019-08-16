const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const keys = require('./config/keys'); 
const employeeRoute = require('./routes/emloyeeRoute');

app.use(bodyParser.urlencoded({ extended: true }));         
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 
app.set('views', 'views'); 
app.use(express.static(__dirname + '/public')); 

// Routes
app.use(employeeRoute);
// Mongo connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }); 

const PORT = 3000 || process.env.PORT;
app.listen(PORT);