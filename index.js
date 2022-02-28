const debug = require('debug');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const cources = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();



app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: true })) // key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'developmet') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}

app.use(logger);

// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port 3000...`));