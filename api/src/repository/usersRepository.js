const { User } = require('../models');

exports.getAll = async () => {
  const users = await User.findAll({
    where: {
      active: true
    }
  });

  return users;
};

exports.getOne = async (id) => {
  return await User.findOne({
    where: {
      id,
      active: true
    }
  });
};

exports.create = async (data) => {
  const { name, email, password } = data;

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

exports.update = async (id, data) => {
  const { name, email } = data;

  const [updated] = await User.update(
    {
      name,
      email,
    },
    {
      where: {
        id,
        active: true
      },
    }
  );

  if (!updated) return null;

  return await User.findOne({
    where: {
      id,
      active: true
    }
  });
};

exports.delete = async (id) => {
  const [updated] = await User.update(
    {
      active: false
    },
    {
      where: {
        id,
        active: true
      }
    }
  );

  return updated > 0;
};

exports.findByEmail  = async (data) => {
  const { email } = data;

  return await User.findOne({
    where: {
      email,
    },
    attributes: { include: ['password'] } 
  });
};