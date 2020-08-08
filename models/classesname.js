'use strict';
module.exports = (sequelize, DataTypes) => {
  const classesName = sequelize.define('classesName', {
    name: DataTypes.STRING
  }, {});
  classesName.associate = function(models) {
    // associations can be defined here
  };
  return classesName;
};