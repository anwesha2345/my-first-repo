'use strict';
module.exports = (sequelize, DataTypes) => {
  const student_news_feeds = sequelize.define('student_news_feeds', {
    student_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attach_file: DataTypes.STRING,
    status: DataTypes.STRING,
    total_like: DataTypes.STRING,
    total_comment: DataTypes.STRING,
    total_share: DataTypes.STRING,
    remove_status: DataTypes.STRING,
    total_report: DataTypes.STRING
  }, {});
  student_news_feeds.associate = function(models) {
    // associations can be defined here
  };
  return student_news_feeds;
};