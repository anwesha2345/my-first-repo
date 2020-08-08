'use strict';
module.exports = (sequelize, DataTypes) => {
  const state = sequelize.define('state', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    state_code: DataTypes.STRING,
    state_zone: DataTypes.STRING,
    gst_code: DataTypes.STRING
  }, {});
  state.associate = function(models) {
    // associations can be defined here
  };
  return state;
};