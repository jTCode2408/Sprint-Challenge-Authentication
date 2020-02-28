const router = require('express').Router();
const crypt = require('bcryptjs');
const jToken = require('jsonwebtoken');

const Users = require('./users-model');


router.post('/register', (req, res) => {
  const newUser = req.body
  // implement registration
  //hash password then do req
Users.add(newUser)
  .then(newest => {
    res.status(201).json(newest)
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
      if (username) {
        res.status(200).json({Welcome: `${username}` })
      } else {
        res.status(400).json({error:'creentials not found'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:"unable to login"})
    })



});

module.exports = router;
