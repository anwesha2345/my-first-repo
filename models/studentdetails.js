'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentDetails = sequelize.define('studentDetails', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    role: DataTypes.STRING,
    image: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    class: DataTypes.STRING,
    section: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  studentDetails.associate = function(models) {
    // associations can be defined here
  };
  return studentDetails;
};