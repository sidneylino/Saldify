const usersRepository = require('../repository/usersRepository');
const bcrypt = require('bcrypt');

exports.getAll = async () => {
  return await usersRepository.getAll();
};

exports.getOne = async (id) => {
  return await usersRepository.getOne(id);
};

exports.create = async (data) => {
  const existingUser = await usersRepository.findByEmail({ email: data.email });

  if (existingUser) {
    return null;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
  const newData = { ...data, password: hashedPassword };

  return await usersRepository.create(newData);
};

exports.update = async (id, data) => {
  const existingUser = await usersRepository.findByEmail({ email: data.email });

  if (existingUser) {
    return null;
  }

  return await usersRepository.update(id, data);
};

exports.delete = async (id) => {
  return await usersRepository.delete(id);
};

exports.authUser = async (data) => {
  const { email, password } = data;

  const user = await usersRepository.findByEmail({ email });

  if (!user) {
    return null; 
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
};