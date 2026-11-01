const transactionService = require('../services/transactionsService');
const moment = require('moment')

exports.getAll = async (req, res) => {
  try {
    const user_id = req.userId;

    const transactions = await transactionService.getAll(user_id);

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching transactions' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;

    const transaction = await transactionService.getOne(id, user_id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching transaction' });
  }
};

exports.create = async (req, res) => {
  try {    console.log(req.body)

    const user_id = req.userId;
    const { type } = req.body;
    const { transaction_date } = req.body;

    if (!type || !transaction_date) {
      return res.status(400).json({
        message: 'Type, ID, and transaction date are required.'
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be income or expense'
      });
    }

    const transaction = await transactionService.create({
      ...req.body,
      user_id
    });

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating transaction' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const { type } = req.body;
    const { transaction_date } = req.body;

    if (!type || !id || !transaction_date) {
      return res.status(400).json({
        message: 'Type, ID, and transaction date are required.'
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be income or expense'
      });
    }

    req.body.transaction_date = moment(transaction_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const updated = await transactionService.update(id, user_id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating transaction' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;

    const deleted = await transactionService.delete(id, user_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting transaction' });
  }
};