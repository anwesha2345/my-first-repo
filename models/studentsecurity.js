'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentSecurity = sequelize.define('studentSecurity', {
    student_id: DataTypes.INTEGER,
    csrf_token: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  studentSecurity.associate = function(models) {
    // associations can be defined here
  };
  return studentSecurity;
};