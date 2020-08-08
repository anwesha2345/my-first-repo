'use strict';
module.exports = (sequelize, DataTypes) => {
  const hoby = sequelize.define('hoby', {
    name: DataTypes.STRING
  }, {});
  hoby.associate = function(models) {
    // associations can be defined here
  };
  return hoby;
};