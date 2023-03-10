const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf8');

const jwtConfig = {
  algorithm: 'HS256',
};

const createToken = (id, name, email, role) => {
  const token = jwt.sign({ id, name, email, role }, secret, jwtConfig);
  
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    payload.token = authorization;
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = { createToken, verifyToken };
