'use strict';
module.exports = (sequelize, DataTypes) => {
  const classRelatedIssues = sequelize.define('classRelatedIssues', {
    issue_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    meta_description: DataTypes.STRING,
    blog_tags: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    file_original_name: DataTypes.STRING,
    reading_time: DataTypes.STRING,
    total_viewer: DataTypes.STRING,
    image_for_listing: DataTypes.STRING,
    image_for_sharing: DataTypes.STRING
  }, {});
  classRelatedIssues.associate = function(models) {
    // associations can be defined here
  };
  return classRelatedIssues;
};