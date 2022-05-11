const express = require('express')
const { createSeller, getSellers } = require('./controllers/seller.controller')
const { createProduct, getProducts } = require('./controllers/product.controller');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  res.send('Node server is running')
})

app.post('/seller', createSeller);
app.get('/sellers', getSellers);

app.post('/seller/:sellerId/product', createProduct);
app.get('/products', getProducts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})