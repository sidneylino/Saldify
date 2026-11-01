const express = require('express');
const transactionController = require('../controller/transactionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, transactionController.getAll);

router.get('/:id', authMiddleware, transactionController.getOne);

router.post('/', authMiddleware, transactionController.create);

router.put('/:id', authMiddleware, transactionController.update);

router.delete('/:id', authMiddleware, transactionController.delete);
 
module.exports = router;