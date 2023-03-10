const db = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (username, password, role) => {
  password = bcrypt.hashSync(password, 10);
  const result = db.User.create({username, password, role});
  return result;
}

const updateUser = async (id, username, password, newPassword) => {
  const result = await db.User.findOne({ where: { username} });
  const comparePassword = bcrypt.compare(password, result.password);
  if(!comparePassword) {
    throw new Error('wrong password');
  };

  newPassword = bcrypt.hashSync(newPassword, 10);
  const secondResult = db.User.update({password: newPassword}, { where: { id } });
  return secondResult;
}

const removeUser = async (id) => {
  const result = await db.User.destroy({ where: { id } });
  return result;
}

const login = async (username, password) => {
  const result = await db.User.findOne({ where: { username } });
  if(!result) {
    throw new Error('user not found');
  }
  const comparePassword = bcrypt.compare(password, result.password);
  if(!comparePassword) {
    throw new Error('wrong password');
  }

  const token = jwt.sign({ username: username, role: result.role }, 'secret', { expiresIn: '1d' });
  return token;
}

const addToCart = async (name, id) => {
  const result = await db.User.findOne({ where: { id } });
  console.log(result);
  const cart = result.cart;
  const productResult = await db.Product.findOne({ where: { name } });
  if(!productResult) {
    throw new Error('product not found');
  }
  const productId = productResult.id;
  cart.push(productId);
  const secondResult = await db.User.update({ cart }, { where: { id } });
  const finalResult = await db.User.findOne({ where: { id } });
  return finalResult;
}

module.exports = {
  createUser,
  updateUser,
  removeUser,
  login,
  addToCart
};