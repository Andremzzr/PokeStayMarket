require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require("passport");
const discordStrategy = require('./strategies/discordstrategy');
const db  = require('./database/database');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');


const urlencodeParser = bodyParser.urlencoded({extended: false});


db.then(
    () => console.log("Conected to MongoDB")
)
.catch(err => console.log(err));

//ROUTES
const authRoute = require('./routes/auth.js');
const dashboardRoute = require('./routes/dashboard');

app.use(session({
    secret : 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized : false,
    name: 'discord.oauth2'
}));

app.use(flash());

//SET VIEWS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(urlencodeParser);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//MIDLEWARE ROUTES
app.use('/auth',authRoute);
app.use('/dashboard',dashboardRoute);
app.get('/', (req,res) => {
    res.render('home');
})
app.get('/forbiden', (req,res) => {
    res.render('forbiden');
})

app.use((req,res,next) => {
    res.status(404).render('404');
})

app.listen(process.env.PORT || 5000, () => console.log(`Server online, on the port ${process.env.PORT}`));