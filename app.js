var express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/weekly_assignments_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB (via Mongoose)');
});

var app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true 
}));

app.use(session({
  secret: 'secret-key-which-doesnt-matter-for-dev',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

var googleOauthRequestRouter = require('./routes/googleOauthRequest');
var googleOauthRouter = require('./routes/googleOauth');
var linkedInOauthRequestRouter = require('./routes/linkedInOauthRequest');
var linkedInOauthRouter = require('./routes/linkedInOauth');
var userRouter = require('./routes/user');

app.use('/requestOauth', googleOauthRequestRouter);
app.use('/oauth', googleOauthRouter);
app.use('/linkedInOauthRequest', linkedInOauthRequestRouter);
app.use('/linkedInOauth', linkedInOauthRouter);
app.use('/user', userRouter);
app.post('/test431', (req, res) => res.json({ ok: true }));
app.get('/session', (req, res) => {
  res.json({ user: req.session.user || null });
});

module.exports = app;

