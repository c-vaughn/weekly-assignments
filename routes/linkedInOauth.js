const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

async function getUserData(access_token) {
    const response = await fetch(`https://api.linkedin.com/v2/userinfo`, {
        headers: {
            'Authorization': `Bearer ${access_token}`

        }
    });
    const data = await response.json();
    console.log('user data', data);
    return data;
}

router.get('/', async function (req, res, next) {
    const code = req.query.code;
    try {
        const redirectUrl = 'http://localhost:3001/linkedInAuthLoader';
        const clientId = process.env.LINKEDIN_OAUTH_CLIENT_ID;
        const clientSecret = process.env.LINKEDIN_OAUTH_CLIENT_SECRET;
        const grantType = 'authorization_code';

        const response = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=${grantType}&code=${code}&redirect_uri=${redirectUrl}&client_id=${clientId}&client_secret=${clientSecret}`);
        const data = await response.json();
        console.log('response', data);
        const userData = await getUserData(data.access_token);
        req.session.user = userData;
        res.json({ user: userData });

    } catch (error) {
        console.error('LinkedIn sign in failed', error);
        res.status(500).send('LinkedIn sign in failed');
    }
});
    

module.exports = router;