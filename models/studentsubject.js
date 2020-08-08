'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentSubject = sequelize.define('studentSubject', {
    student_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {});
  studentSubject.associate = function(models) {
    // associations can be defined here
  };
  return studentSubject;
};