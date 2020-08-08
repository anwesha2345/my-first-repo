'use strict';
module.exports = (sequelize, DataTypes) => {
  const classNames = sequelize.define('classNames', {
    name: DataTypes.STRING,
    class_id: DataTypes.INTEGER
  }, {});
  classNames.associate = function(models) {
    // associations can be defined here
  };
  return classNames;
};