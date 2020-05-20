/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jToken = require('jsonwebtoken');
const {jSecret } = require('../config/secrets')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jToken.verify(authorization, jSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "shall not pass" })
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({error: "no cedentials given"})
  }

};
