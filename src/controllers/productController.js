const productServices = require('../services/productServices');
const db = require('../../database/models');

const getAllProducts = async (req, res) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProductById = async (req, res) => { // ask about res.json() being async
  try {
    const { id } = req.params;
    const result = await productServices.getProductById(id);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const { authorization } = req.headers;
    const result = await productServices.createProduct(name, authorization);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};