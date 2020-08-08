'use strict';
module.exports = (sequelize, DataTypes) => {
  const stContact = sequelize.define('stContact', {
    name: DataTypes.STRING,
    student_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    matter: DataTypes.STRING
  }, {});
  stContact.associate = function(models) {
    // associations can be defined here
  };
  return stContact;
};