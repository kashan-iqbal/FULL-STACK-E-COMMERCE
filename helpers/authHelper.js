const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10); // await should be used here
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.log(error);
    }
  },

  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};
