'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('news_feeds_to_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      news_feed_id: {
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
      total_reply: {
        type: Sequelize.STRING
      },
      remove_status: {
        type: Sequelize.STRING
      },
      file_type: {
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
    return queryInterface.dropTable('news_feeds_to_comments');
  }
};