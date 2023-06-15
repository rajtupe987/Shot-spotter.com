// module.exports = (sequelize, DataTypes) => {
//     const Photographer = sequelize.define("photographers", {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       category: DataTypes.ARRAY(DataTypes.STRING),
//       availability: DataTypes.BOOLEAN,
//       email: DataTypes.STRING,
//       phone_number: DataTypes.STRING,
//       location: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: false,
//         defaultValue: []
//       },
//       bio: DataTypes.TEXT
//     });
  
//     return Photographer;
//   };
  
// module.exports = (sequelize, DataTypes) => {
//   const Photographer = sequelize.define("photographers", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     category: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       get: function() {
//         const rawValue = this.getDataValue("category");
//         return rawValue ? JSON.parse(rawValue) : null;
//       },
//       set: function(value) {
//         this.setDataValue("category", JSON.stringify(value));
//       }
//     },
//     availability: DataTypes.BOOLEAN,
//     email: DataTypes.STRING,
//     phone_number: DataTypes.STRING,
//     location: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: "[]",
//       get: function() {
//         const rawValue = this.getDataValue("location");
//         return JSON.parse(rawValue);
//       },
//       set: function(value) {
//         this.setDataValue("location", JSON.stringify(value));
//       }
//     },
//     price:DataTypes.NUMBER,
//     bio: DataTypes.TEXT
//   });

//   return Photographer;
//};

module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define("photographers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        try {
          const rawValue = this.getDataValue("category");
          return rawValue ? JSON.parse(rawValue) : null;
        } catch (error) {
          console.error("Error parsing category JSON:", error);
          return null;
        }
      },
      set(value) {
        this.setDataValue("category", JSON.stringify(value));
      }
    },
    availability: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      get() {
        try {
          const rawValue = this.getDataValue("location");
          return JSON.parse(rawValue);
        } catch (error) {
          console.error("Error parsing location JSON:", error);
          return [];
        }
      },
      set(value) {
        this.setDataValue("location", JSON.stringify(value));
      }
    },
    price: DataTypes.NUMBER,
    bio: DataTypes.TEXT
  });

  return Photographer;
};

