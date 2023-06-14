module.exports = (sequelize, DataTypes) => {
    const Photographer = sequelize.define("photographers", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: DataTypes.ARRAY(DataTypes.STRING),
      availability: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      location: DataTypes.ARRAY(DataTypes.STRING),
      bio: DataTypes.TEXT
    });
  
    return Photographer;
  };
  