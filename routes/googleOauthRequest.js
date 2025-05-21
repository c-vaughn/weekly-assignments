const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

router.post('/', async function (req, res, next) {
    console.log('Received POST /requestOauth');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'http://localhost:3001/googleAuthLoader';

    const client = new OAuth2Client(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirectUrl
    );
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile openid email'],
    });

    res.json({ url: authorizeUrl });
});

module.exports = router;