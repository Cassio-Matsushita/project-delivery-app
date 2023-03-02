const { User } = require('../../database/models');
const crypto = require('crypto'); 

const getUser = async ({ email, password }) => {
  const registeredEmail = await User.findOne({ where: { email } });
  
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  
  if (!registeredEmail) return { message: 'Invalid User or Password' };

  if (hashedPassword === registeredEmail.password) return registeredEmail;
};

module.exports = {
  getUser,
};