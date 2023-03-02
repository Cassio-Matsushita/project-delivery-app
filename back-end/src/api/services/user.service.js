const crypto = require('crypto');
const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../../database/models');

const createUser = async ({ email, password, name }) => {
  const registeredEmail = await User.findOne({ where: { email } });
  const registeredName = await User.findOne({ where: { name } });

  if (registeredEmail || registeredName) {
    return { message: 'User already registered' };
  }
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  const user = await User.create({ name, email, password: hashedPassword, role: 'customer' });
  console.log('service', user);
  return user;
};

module.exports = {
  createUser,
};