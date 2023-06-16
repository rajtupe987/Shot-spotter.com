
module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define("photographers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    availability: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    price: DataTypes.FLOAT,
    bio: DataTypes.TEXT
  });

  return Photographer;
};


// module.exports = (sequelize, DataTypes) => {
//   const Customer = sequelize.define("customers", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     phone_number: {
//       type: DataTypes.STRING
//     }
//   });
//   return Customer;
// };



// module.exports = (sequelize, DataTypes) => {
//   const Booking = sequelize.define("bookings", {
//     booking_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     customer_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     photographer_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     start_time: {
//       type: DataTypes.TIME,
//       allowNull: false
//     },
//     end_time: {
//       type: DataTypes.TIME,
//       allowNull: false
//     }
//   });

//   return Booking;
// };
