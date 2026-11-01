module.exports = (sequelize, DataType) => {
  const transactions = sequelize.define(
    'transactions',
    {
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: DataType.UUID,
        allowNull: false,
      },

      type: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          isIn: [['income', 'expense']],
        },
      },

      description: {
        type: DataType.TEXT,
        allowNull: false,
      },

      amount: {
        type: DataType.DECIMAL,
        allowNull: false,
      },

      category: {
        type: DataType.TEXT,
        allowNull: false,
      },

      transaction_date: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: 'transactions',
      timestamps: true,
      underscored: true,
    }
  );

  transactions.associate = function (models) {
    transactions.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return transactions;
};