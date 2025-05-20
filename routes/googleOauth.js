const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('user data', data);
}

router.get('/', async function (req, res, next) {
    const code = req.query.code;
    try {
        const redirectUrl = 'http://127.0.0.1:2000/oauth';
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );
        const response = await client.getToken(code);
        await client.setCredentials(response.tokens);
        console.log('response', response);
        const user = client.credentials;
        console.log('user', user);
        await getUserData(user.access_token);

    } catch (error) {
        console.error('Google sign in failed', error);
        res.status(500).send('Google sign in failed');
    }
});
    

module.exports = router;