const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https')
const fs = require('fs');

// dot env package
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.ORIGIN || 'https://localhost:4200', 
  credentials: true // for cookies
}

const app = express();
app.use(cors(corsOptions));

// require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Gallery-Project', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('DB connected')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes

const userRouter = require('./routes/routes');
app.use('/api/v1', userRouter);

const serverOptions = {
  key: fs.readFileSync("ssl/local.key"),
  cert: fs.readFileSync("ssl/local.cert")
};

https.createServer(serverOptions,app).listen(PORT,() =>
  console.log(`listening on ${PORT}, don't forget the https`));

