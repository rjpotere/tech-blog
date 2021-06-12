const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/newuser', async (req, res) => {
  try {
    console.log(req.body)
    const newUser = req.body;

    newUser.password = await bcrypt.hash(req.body.password, 10);
console.log('TESTLOG')
    const userData = await User.create(newUser);
console.log('TESTLOG2')
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Logged in' })
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log('hello')
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;