'use strict';
module.exports = (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    image:DataTypes.STRING,
    image_original_name:DataTypes.STRING,
    class_ids:DataTypes.STRING
  }, {});
  teacher.associate = function(models) {
    // associations can be defined here
  };
  return teacher;
};