'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatUser = sequelize.define('chatUser', {
    handler_name: DataTypes.STRING,
    message: DataTypes.STRING,
    socket_id: DataTypes.STRING
  }, {});
  chatUser.associate = function(models) {
    // associations can be defined here
  };
  return chatUser;
};