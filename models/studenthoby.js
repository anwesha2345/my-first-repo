'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentHoby = sequelize.define('studentHoby', {
    student_id: DataTypes.INTEGER,
    hoby_id: DataTypes.INTEGER
  }, {});
  studentHoby.associate = function(models) {
    // associations can be defined here
  };
  return studentHoby;
};