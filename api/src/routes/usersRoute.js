const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const usersController = require('../controller/usersController');

const router = express.Router();

router.get('/',authMiddleware, usersController.getAll);

router.post('/auth', usersController.authUser);

router.get('/:id',authMiddleware, usersController.getOne);

router.post('/', usersController.create);

router.put('/:id',authMiddleware, usersController.update);

router.delete('/:id',authMiddleware, usersController.delete);

module.exports = router;