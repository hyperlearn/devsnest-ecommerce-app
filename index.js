const express = require('express')
const { createSeller, getSellers } = require('./controllers/seller.controller')
const { createProduct, getProducts } = require('./controllers/product.controller');
const { createOtp, validateOtp } = require('./controllers/otp.controller')
const { signUp, login, forgotPassword, resetPassword } = require('./controllers/user.controller');
const { createOrder } = require('./controllers/order.controller');
const { authenticate } = require('./middlewares/auth');
const jobs = require('./jobs');
const multer = require('multer');

// socket io
const http = require('http');
const { Server } = require('socket.io');

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
const { SocketAddress } = require('net');

const app = express()
const port = 3000

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false })) // express.urlencoded({extended: true/ false})

app.use(bodyParser.json()) // express.json()

app.get('/status', (req, res) => {
  res.send('Node server is running')
})

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

app.post('/seller', authenticate, createSeller);
app.get('/sellers', getSellers);

// app.post('/seller/:sellerId/product', uploads.single('productImage'), createProduct);
app.post('/seller/:sellerId/product', uploads.array('productImages', 6), createProduct);
app.get('/products', getProducts);

app.post('/otp', createOtp);
app.post('/validateotp', validateOtp);


app.post('/auth/signup', signUp);
app.post('/auth/login', login);
app.post('/auth/forgotPassword', forgotPassword);
app.post('/auth/resetPassword', authenticate, resetPassword);


app.post('/order', createOrder);

jobs()
const sockets = []
io.on('connection', async (socket) => {
  console.log('A user connected');
  sockets.push(socket.id);
  // socket.on("client-message", async (data) => {
  //   console.log('Client said', data);

  //   if (data === "get sellers") {
  //     const resp = await getSellers({ query: null});
  //     socket.emit("server-message", JSON.stringify(resp, null, 2));
  //   } else {
  //     socket.emit("server-message", "Hello there!")
  //   }
  // })

  console.log('sockets', sockets)

  socket.emit("from-server", "Connected");

  socket.on("dm", (_msg) => {
    console.log('incoming', _msg);
    const [anotherSocketId, msg] = _msg.split(':');
    socket.to(anotherSocketId).emit("from-server", msg);
  })



  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
})



httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
