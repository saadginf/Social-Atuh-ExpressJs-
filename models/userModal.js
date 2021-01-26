module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    socialid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pic: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return User;
};
