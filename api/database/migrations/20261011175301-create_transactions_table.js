'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      type: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      category: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      transaction_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex(
      'transactions',
      ['user_id', 'transaction_date'],
      {
        name: 'idx_transactions_user_date'
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
  }
};