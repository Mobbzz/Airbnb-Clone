const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
  return jwt.sign({ _id: user._id, displayName: user.displayName }, secretKey, { expiresIn: '1d' })
}


exports.verifyToken = (req, res, next) => {

  // Bearer <token>
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, secretKey)
    next()
  } 
  catch {
    return res.status(401).json({
      message: 'Access restricted! Please Login!'
    })
  }

}