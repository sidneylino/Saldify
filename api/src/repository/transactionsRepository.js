const { Transactions } = require('../models')

exports.getAll = async (user_id) => {
  const transactions = await Transactions.findAll({
    where: {
      user_id
    },
    order: [['transaction_date', 'DESC']]
  });
  return transactions;
};

exports.getOne = (id, user_id) => {
  return Transactions.findOne({
    where: {
      id,
      user_id
    }
  });
};

exports.create = async (data) => {
  const {
    user_id,
    type,
    description,
    amount,
    category,
    transaction_date
  } = data;

  const transaction = await Transactions.create({
    user_id,
    type,
    description,
    amount,
    category,
    transaction_date
  });

  return transaction;
};

exports.update = async (id, user_id, data) => {
  const {
    type,
    description,
    amount,
    category,
    transaction_date
  } = data;

  const [updated] = await Transactions.update(
    {
      type,
      description,
      amount,
      category,
      transaction_date
    },
    {
      where: {
        id,
        user_id
      }
    }
  );

  return updated;
};

exports.delete = async (id, user_id) => {
  const deleted = await Transactions.destroy({
    where: {
      id,
      user_id
    }
  });

  return deleted;
};