const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const Router = require('./Router');


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

const db = mysql.createConnection({
    user: 'samuelssons',
    host: 'localhost',
    port: '8889',
    password: 'Richard79!!',
    database: 'samuelssons',
});

db.connect(function(err){
    if (err){
    console.log('DB error');
    throw err;
    return false;
}
})
//5 Years...
const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 *1000),
    endConnectionOnclose: false
}, db);

app.use(session({
    key: 'jlkasJDLKJalskdu123401923412lk34jl',
    secret: 'mnlakjsdk.nalk98078756AUysdiasd8',
    store: sessionStore,
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 *1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get('./', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(3000);

