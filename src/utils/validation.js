const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter Correct firstname or lastname");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter correct email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Use Strong Password");
  }
};

const validateLoginemail = (req) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Enter correct email id");
  }
};

module.exports = {
  validateSignup,
  validateLoginemail,
};
