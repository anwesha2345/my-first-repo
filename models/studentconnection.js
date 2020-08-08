'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentConnection = sequelize.define('studentConnection', {
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    accept_status: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  studentConnection.associate = function(models) {
    // associations can be defined here
  };
  return studentConnection;
};