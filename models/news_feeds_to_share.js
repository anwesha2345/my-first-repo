'use strict';
module.exports = (sequelize, DataTypes) => {
  const news_feeds_to_share = sequelize.define('news_feeds_to_share', {
    student_id: DataTypes.INTEGER,
    feed_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  news_feeds_to_share.associate = function(models) {
    // associations can be defined here
  };
  return news_feeds_to_share;
};