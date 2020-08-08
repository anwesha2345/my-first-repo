'use strict';
module.exports = (sequelize, DataTypes) => {
  const stPrefference = sequelize.define('stPrefference', {
    subject_id: DataTypes.INTEGER,
    hoby_id: DataTypes.INTEGER
  }, {});
  stPrefference.associate = function(models) {
    // associations can be defined here
  };
  return stPrefference;
};