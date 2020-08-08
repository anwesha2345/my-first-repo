'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_news_feeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      attach_file: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total_like: {
        type: Sequelize.STRING
      },
      total_comment: {
        type: Sequelize.STRING
      },
      total_share: {
        type: Sequelize.STRING
      },
      remove_status: {
        type: Sequelize.STRING
      },
      total_report: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student_news_feeds');
  }
};