const usersService = require('../services/usersService');
const authService = require('../services/authService');
const { validate: isUUID } = require('uuid');

exports.getAll = async (req, res) => {
  try {
    const data = await usersService.getAll();

    return res.status(200).send({
      data,
      msg: 'Users found',
      error: {},
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).send({
      data: {},
      msg: 'Bad request',
    });
  }
};

exports.getOne = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({
        message: 'Invalid user'
      });
    }

    const data = await usersService.getOne(id);

    if (!data) {
      return res.status(404).send({
        data: {},
        msg: 'Not found',
        error: {},
      });
    }

    return res.status(200).send({
      data,
      msg: 'Found',
      error: {},
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).send({
      data: {},
      msg: 'Bad request',
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userCreated = await usersService.create({
      name,
      email,
      password,
    });

    if (!userCreated) {
      return res.status(400).json({ msg: "Registration failed" });
    }

    const data = userCreated.toJSON();

    delete data.password; 
    return res.status(201).send({
      data,
      msg: 'Created',
      error: {},
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).send({
      data: {},
      msg: 'Bad request',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({
        message: 'Invalid user'
      });
    }
    
    if (req.userId !== id) {
        return res.status(403).json({ msg: "You don't have permission" });
    }

    if (!name || !email) {
      return res.status(400).json({ 
        msg: "Validation failed", 
        error: "Name and Email are required fields" 
      });
    }

    const data = await usersService.update(id, {
      name,
      email,
    });

    if (!data) {
      return res.status(400).json({ msg: "Updated failed" });
    }

    if (!data) {
      return res.status(404).send({
        data: {},
        msg: 'Not found',
        error: {},
      });
    }

    return res.status(200).send({
      data,
      msg: 'Updated',
      error: {},
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).send({
      data: {},
      msg: 'Bad request',
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({
        message: 'Invalid user'
      });
    }

    if (req.userId !== id) {
        return res.status(403).json({ msg: "You don't have permission" });
    }

    const data = await usersService.delete(id);

    if (!data) {
      return res.status(404).send({
        data: {},
        msg: 'Not found',
        error: {},
      });
    }

    return res.status(200).send({
      data: {},
      msg: 'Deleted',
      error: {},
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).send({
      data: {},
      msg: 'Bad request',
    });
  }
};

exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        msg: 'Email and password required',
        error: {},
      });
    }

    const user = await usersService.authUser({ email, password });

    if (!user) {
        return res.status(401).send({ msg: 'Invalid email or password' });
    }

    const token = authService.generateToken(user);

    return res.status(200).send({
      user: { id: user.id },
      token,
      msg: 'Login successful'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: 'Internal error', error: error.message });
  }
};