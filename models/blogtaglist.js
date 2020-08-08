'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogTagList = sequelize.define('blogTagList', {
    name: DataTypes.STRING,
    score: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  blogTagList.associate = function(models) {
    // associations can be defined here
  };
  return blogTagList;
};