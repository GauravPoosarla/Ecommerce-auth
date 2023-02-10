const userServices = require('../services/userServices');

const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const result = await userServices.createUser(username, password, role);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const result = await userServices.updateUser(id, username, password);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userServices.removeUser(id);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userServices.login(username, password);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  updateUser,
  removeUser,
  login,
};