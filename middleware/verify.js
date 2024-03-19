const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers['authorization']
  if (authHeaders) {
    const token = authHeaders.split(" ")[1]
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return res.status(401).json("Invalid token")
      req.user = user;
      next();
    })
  } else {
    res.status(500).json("Unauthorized token")
  }
}

const verifyAndAuthenticate = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }
  })
}
const verifyAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    }
  })
}

module.exports = { verifyToken, verifyAndAuthenticate, verifyAndAdmin }