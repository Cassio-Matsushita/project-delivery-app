const { verifyToken } = require('../auth/jwtFunctions');

const auth = (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const user = verifyToken(authorization);

      return res
        .status(200)
        .json({
          name: user.name,
          email: user.email,
          role: user.role,
          token: authorization,
        });
    }
    return res.status(401).json({ message: 'Token not found' });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = { auth };