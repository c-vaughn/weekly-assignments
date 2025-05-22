const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  res.json(user);
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
    await user.save();
  }
  res.json(user);
});

module.exports = router;