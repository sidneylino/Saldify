module.exports = (sequelize, DataType) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataType.STRING,
        allowNull: false,
      },

      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  );

  users.associate = function (models) {
  };

  return users;
};