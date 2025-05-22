const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', async function (req, res, next) {
    const redirectUrl = 'http://localhost:3001/linkedInAuthLoader';
    const clientId = process.env.LINKEDIN_OAUTH_CLIENT_ID;
    const scope = 'openid profile email';
    const state = Math.random().toString(36).substring(2, 18); // random 16 character string
    const authorizeUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scope)}&state=${state}`;

    res.json({ url: authorizeUrl });
});

module.exports = router;

