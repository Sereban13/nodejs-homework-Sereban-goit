const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
