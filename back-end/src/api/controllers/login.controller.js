const loginService = require('../services/login.service');

const getUser = async (req, res) => {
  const result = await loginService.getUser(req.body);

  if (result.message) return res.status(404).json(result.message);

  return res.status(200).json(result);
};

module.exports = { getUser };