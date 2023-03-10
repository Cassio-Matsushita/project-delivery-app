const { verifyToken } = require('../auth/jwtFunctions');

const validateSale = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const user = verifyToken(authorization);

      if (user) return next();
    }
    return res.status(401).json({ message: 'Token not found' });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = { validateSale };