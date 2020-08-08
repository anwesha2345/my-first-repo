'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classRelatedIssues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      issue_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      meta_keywords: {
        type: Sequelize.STRING
      },
      meta_description: {
        type: Sequelize.STRING
      },
      blog_tags: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      file_original_name: {
        type: Sequelize.STRING
      },
      reading_time: {
        type: Sequelize.STRING
      },
      total_viewer: {
        type: Sequelize.STRING
      },
      image_for_listing: {
        type: Sequelize.STRING
      },
      image_for_sharing: {
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
    return queryInterface.dropTable('classRelatedIssues');
  }
};