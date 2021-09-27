'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const requestLogStream = require('./logger/logger.js').requestLogStream;
const consoleLogger = require('./logger/logger.js').console;
const requestLogger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const eta = require('eta');

// App
const app = express();

// Routers
const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'eta')
app.engine('eta', eta.renderFile)


// set path for static assets
app.use('/', express.static(path.join(__dirname, 'public')));

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

/* Logs for API requests */
// Logs to skip based on url pattern
function skipLog(req, res) {
    const answer = req.originalUrl.indexOf('healthcheck') > -1;
    return answer;
}
// Request Logger
// Log API requests to console
app.use(requestLogger('dev', { skip: skipLog }));
// Log API requests in the Apache combined format to one log file per day
app.use(requestLogger('combined', { stream: requestLogStream, flags: 'a', skip: skipLog }));

// Routes
app.use(['/healthcheck'], (req, res, next) => {
    res.status(200).json({ "status": 200, "message": "docker-nodejs-template" });
});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    consoleLogger.error(err);
    // Unauthorized
    if (err.name === 'UnauthorizedError' || err.status === 401) {
        // Redirect to welcome page
        res.redirect(302, '/');
    } else {
        // Other generic errors
        res.render("error", {
            status: err.status,
            error: err.message,
        });
    }
});

module.exports = app;
