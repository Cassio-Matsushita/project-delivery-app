const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const result = await userService.createUser(req.body);

  if (result.message) return res.status(409).json(result.message);

  return res.status(201).json(result);
};

module.exports = { createUser };