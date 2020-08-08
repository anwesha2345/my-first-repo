'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogImages = sequelize.define('blogImages', {
    student_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    blog_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  blogImages.associate = function(models) {
    // associations can be defined here
  };
  return blogImages;
};