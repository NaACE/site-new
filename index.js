const express = require('express');
// mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const siteRoutes = require('./routes/main');
var session = require('express-session');
const cookieParser = require('cookie-parser');
//const db = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main', extname: 'hbs' });

app.use(cookieParser());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}));

app.use(siteRoutes);




//mongoose.connect('mongodb+srv://admin:admin@cluster0.k9a0j.mongodb.net?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() => console.log('Db connected'))
//    .catch(err => console.log(err));


async function start() {
    app.listen(PORT, () => {
        console.log('Server has been started...');
    })
}

start();