var express = require('express');


var app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true 
}));

var googleOauthRequestRouter = require('./routes/googleOauthRequest');
var googleOauthRouter = require('./routes/googleOauth');
var linkedInOauthRequestRouter = require('./routes/linkedInOauthRequest');
var linkedInOauthRouter = require('./routes/linkedInOauth');

app.use('/requestOauth', googleOauthRequestRouter);
app.use('/oauth', googleOauthRouter);
app.use('/linkedInOauthRequest', linkedInOauthRequestRouter);
app.use('/linkedInOauth', linkedInOauthRouter);
app.post('/test431', (req, res) => res.json({ ok: true }));


module.exports = app;

