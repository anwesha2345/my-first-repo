'use strict';
module.exports = (sequelize, DataTypes) => {
  const issues = sequelize.define('issues', {
    name: DataTypes.STRING,
    remarks: DataTypes.STRING,
    status: DataTypes.STRING,
    class_id: DataTypes.STRING,
    class_image: DataTypes.STRING,
    class_icon: DataTypes.STRING
  }, {});
  issues.associate = function(models) {
    // associations can be defined here
  };
  return issues;
};