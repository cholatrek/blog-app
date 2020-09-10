const express = require('express'); //instantiating a module 
const app = express();
const ejs =  require('ejs');//templating engine connection
const secret  = require('./config/secret');
var bodyParser = require("body-parser");
// const sessions = require('sessions')
const flash =  require('connect-flash');
const passport = require('passport');
const session = require('express-session');



app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
// const path = require('path'); 
const mongoose = require('mongoose');

mongoose.connect(secret.databaseURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are already connected to the server database")
});
 

//helps us to activate or gives permission to the server to know the user 
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 





//this enables us to use ejs templating engine
app.set('view engine', 'ejs');

//this enables us to make use of css js and images on the website
app.use('/', express.static('public'));
  

// this connects the routes to the main file
const pageRoutes = require('./controllers/pageRoutes');
app.use('/',pageRoutes );


const userRoute = require('./controllers/user');
app.use('/auth', userRoute)

const adminRoutes = require('./controllers/adminRoute')
app.use('/admin', adminRoutes );

// confuigration of port 
app.listen(secret.PORT, ()=>{
    console.log("the server is running at port " + secret.PORT);
}  );
 