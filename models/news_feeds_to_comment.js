'use strict';
module.exports = (sequelize, DataTypes) => {
  const news_feeds_to_comment = sequelize.define('news_feeds_to_comment', {
    student_id: DataTypes.INTEGER,
    news_feed_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attach_file: DataTypes.STRING,
    status: DataTypes.STRING,
    total_like: DataTypes.STRING,
    total_reply: DataTypes.STRING,
    remove_status: DataTypes.STRING,
    file_type: DataTypes.STRING
  }, {});
  news_feeds_to_comment.associate = function(models) {
    // associations can be defined here
  };
  return news_feeds_to_comment;
};