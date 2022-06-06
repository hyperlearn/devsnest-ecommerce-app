const express = require('express')
const { createSeller, getSellers } = require('./controllers/seller.controller')
const { createProduct, getProducts } = require('./controllers/product.controller');
const { createOtp, validateOtp } = require('./controllers/otp.controller')
const { signUp, login } = require('./controllers/user.controller');
const { createOrder } = require('./controllers/order.controller');
const { authenticate } = require('./middlewares/auth');
const multer = require('multer');

// const uploads = multer({ dest: 'uploads/'});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const uploads = multer({ storage: storage });

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false })) // express.urlencoded({extended: true/ false})

app.use(bodyParser.json()) // express.json()

app.get('/status', (req, res) => {
  res.send('Node server is running')
})

app.post('/seller', authenticate, createSeller);
app.get('/sellers', getSellers);

// app.post('/seller/:sellerId/product', uploads.single('productImage'), createProduct);
app.post('/seller/:sellerId/product', uploads.array('productImages', 6), createProduct);
app.get('/products', getProducts);

app.post('/otp', createOtp);
app.post('/validateotp', validateOtp);


app.post('/auth/signup', signUp);
app.post('/auth/login', login);

app.post('/order', createOrder);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
