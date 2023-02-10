const db = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createProduct = async (name, token) => {
  const decoded = jwt.verify(token, 'secret');
  if(!decoded) {
    throw new Error('jwt malformed');
  }
  
  const { role } = decoded;
  if (role !== 'admin') {
    throw new Error('user not authorized');
  }
  const result = await db.Product.create({ name });
  return result;
}

const getAllProducts = async () => {
  const result = await db.Product.findAll();
  return result;
}

const getProductById = async (id) => {
  const result = await db.Product.findOne({ where: { id } });
  return result;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};