const validateEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

const userValidation = (req, res, next) => {
    console.log('REQBODY', req.body);
    const { email, password, displayName } = req.body;
    if (displayName && displayName.length < 12) {
        return res.status(400)
          .json({ message: '"displayName" length must be at least 8 characters long' });
      }

    if (!validateEmail(email)) {
        return res.status(400)
          .json({ message: '"email" must be a valid email' });
      }
    
    if (password.length < 6) {
        return res.status(400)
          .json({ message: '"password" length must be at least 6 characters long' });
    }
    return next();
  };
  
  module.exports = { userValidation };