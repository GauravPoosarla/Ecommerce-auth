const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(productRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});