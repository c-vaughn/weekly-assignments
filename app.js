var express = require('express');


var app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true 
}));

var googleOauthRequestRouter = require('./routes/googleOauthRequest');
var googleOauthRouter = require('./routes/googleOauth');

app.use('/requestOauth', googleOauthRequestRouter);
app.use('/oauth', googleOauthRouter);
app.post('/test431', (req, res) => res.json({ ok: true }));

module.exports = app;

