'use strict';
module.exports = (sequelize, DataTypes) => {
  const newsFeedsImage = sequelize.define('newsFeedsImage', {
    student_id: DataTypes.INTEGER,
    news_feed_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_original_name: DataTypes.STRING,
    status: DataTypes.STRING,
    delete_status: DataTypes.STRING
  }, {});
  newsFeedsImage.associate = function(models) {
    // associations can be defined here
  };
  return newsFeedsImage;
};