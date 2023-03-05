const crypto = require('crypto'); 
const { User } = require('../../database/models');
const token = require('../auth/jwtFunctions');

const getUser = async ({ email, password }) => {
  const registeredEmail = await User.findOne({ where: { email } });
  
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  
  if (!registeredEmail) return { message: 'Invalid User or Password' };

  if (hashedPassword === registeredEmail.password) {
    const { name, email: userEmail, role } = registeredEmail;
    const result = token.createToken(name, userEmail, role);
    return result;
  }
};

module.exports = {
  getUser,
};