const transactionRepository = require('../repository/transactionsRepository');

exports.getAll = async (user_id) => {
  return transactionRepository.getAll(user_id);
};

exports.getOne = async (id, user_id) => {
  return transactionRepository.getOne(id, user_id);
};

exports.create = async (data) => {
  return transactionRepository.create(data);
};

exports.update = async (id, user_id, data) => {
  return transactionRepository.update(id, user_id, data);
};

exports.delete = async (id, user_id) => {
  return transactionRepository.delete(id, user_id);
};