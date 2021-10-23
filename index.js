const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const siteRoutes = require('./routes/main');
var session = require('express-session');
const cookieParser = require('cookie-parser');

require('./db');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main', extname: 'hbs' });

app.use(cookieParser());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, }));

app.use(siteRoutes);

async function start() {
    app.listen(PORT, () => {
        console.log('Server has been started...');
    })
}

start();