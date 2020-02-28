const router = require('express').Router();
const crypt = require('bcryptjs');
const jToken = require('jsonwebtoken');
const { jSecret } = require('../config/secrets');
const Users = require('./users-model');


router.post('/register', (req, res) => {
  const newUser = req.body
  
  // implement registration
  //hash password then do req
  const hash = crypt.hashSync(newUser.password, 10)
  newUser.password = hash
Users.add(newUser)
  .then(newest => {
    res.status(201).json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "unable to add new user" })
})
});

router.post('/login', (req, res) => {
  // implement login
  //add token on login
  const { username, password} = req.body
  Users.findBy({ username })
    .first()
    .then(loggedIn => {
      if (loggedIn && crypt.compareSync(password, loggedIn.password)) {
        const token = getToken(loggedIn)

        res.status(200).json({
          Welcome: `${username}`, token
        })
      } else {
        res.status(401).json({error:'credentials not found'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:"unable to login"})
    })

});


function getToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "2h",
  }

  return jToken.sign(payload, jSecret, options)
}
module.exports = router;
