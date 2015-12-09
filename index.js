var express = require('express');
var http = require('http');
var Agenda = require('agenda');
var agendaUI = require('agenda-ui');

var app = express();
var agenda = new Agenda({
  db: {
    address: 'localhost:27017/agenda-sample',
    collection: 'agendaJobs'
  }
}, function (err) {
  if (err) throw err;

  console.log('Connected to database');
  agenda._db = agenda._collection;
  app.use('/agenda-ui', agendaUI(agenda, {poll: 1000}));

  http.createServer(app).listen(9000, function () {
    console.log('Express listeing on 9000 port');
  });

});
