const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = {validateJWT};