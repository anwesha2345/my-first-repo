'use strict';
module.exports = (sequelize, DataTypes) => {
  const classRank = sequelize.define('classRank', {
    name: DataTypes.STRING,
    score: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  classRank.associate = function(models) {
    // associations can be defined here
  };
  return classRank;
};