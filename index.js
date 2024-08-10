const express = require('express');
const app = express();
const port = 3002;
const path = require('path');
const moment = require('moment');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
    res.locals.currentDate = moment().format('ddd MMM DD YYYY');
    next();
  });

app.get('/', (req, res, next) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        res.render('home');
        next(); 
    } else {
        res.render('home', { contents: 'The web application is only available during working hours (Monday to Friday, from 9am to 5pm).'});
    }
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
