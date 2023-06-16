module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING
    }
  });
  return Customer;
};