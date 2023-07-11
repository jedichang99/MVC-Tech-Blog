const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hash password before saving the user
  User.addHook("beforeSave", async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  });

  // Method to compare hashed passwords
  User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
