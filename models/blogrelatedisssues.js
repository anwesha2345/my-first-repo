'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogRelatedIsssues = sequelize.define('blogRelatedIsssues', {
    blog_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  blogRelatedIsssues.associate = function(models) {
    // associations can be defined here
  };
  return blogRelatedIsssues;
};